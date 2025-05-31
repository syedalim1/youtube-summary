import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyAXP4kBBXRl6vgqsVYGXm9XNzAozjZnnt8"
);

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return jsonResponse({ error: "YouTube URL is required" }, 400);
  }

  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      return jsonResponse({ error: "Invalid YouTube URL format" }, 400);
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      return jsonResponse(
        {
          error: "No transcript found. Enable captions on the video.",
        },
        400
      );
    }

    const fullTranscript = transcript.map((item) => item.text).join(" ");
    const prompt = `
Please analyze this YouTube video transcript and create a summary in JSON format. 
Make it simple and easy to understand for Tamil-speaking users (use Thanglish style).
Include emojis to make it engaging.

IMPORTANT: Return ONLY valid JSON, no extra text or markdown formatting.

Format should be:
{
  "title": "Video title with emoji",
  "summary_points": [
    { "point": "Main point 1 with emoji" },
    { "point": "Main point 2 with emoji" },
    { "point": "Main point 3 with emoji" }
  ],
  "final_tip": "Motivational closing tip with emoji",
  "video_duration": "estimate like 15m",
  "difficulty_level": "Beginner"
}

Transcript: ${fullTranscript.substring(0, 10000)}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const result = await model.generateContent(prompt);
    let text = (await result.response).text().trim();

    // Clean markdown if Gemini gives code block
    if (text.startsWith("```json"))
      text = text
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    else if (text.startsWith("```"))
      text = text.replace(/^```/, "").replace(/```$/, "").trim();

    let summaryData;
    try {
      summaryData = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", e);
      return jsonResponse(
        {
          error: "Failed to parse Gemini response as JSON",
          raw: text,
        },
        500
      );
    }

    return jsonResponse(summaryData);
  } catch (error) {
    console.error("Error:", error.message);

    // ✅ Handles all types of transcript errors gracefully
    if (
      error.message.includes("Transcript is disabled") ||
      error.message.includes("transcript is not available")
    ) {
      return jsonResponse(
        {
          error:
            "Transcripts are disabled for this video. Please try a different YouTube video.",
        },
        400
      );
    }

    return jsonResponse(
      {
        error: "Something went wrong while processing the video",
        message: error.message,
      },
      500
    );
  }
}

function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^"&?/ ]{11})/);
  return match ? match[1] : null;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

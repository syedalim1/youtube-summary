import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";

const genAI = new GoogleGenerativeAI("AIzaSyAXP4kBBXRl6vgqsVYGXm9XNzAozjZnnt8");

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: "YouTube URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: "Invalid YouTube URL format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No transcript found. Enable captions on the video.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
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

    if (text.startsWith("```json"))
      text = text
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    if (text.startsWith("```"))
      text = text.replace(/^```/, "").replace(/```$/, "").trim();

    let summaryData;
    try {
      summaryData = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", e);
      return new Response(
        JSON.stringify({
          error: "Failed to parse Gemini response as JSON",
          raw: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(summaryData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Something went wrong while processing the video",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^"&?/ ]{11})/);
  return match ? match[1] : null;
}

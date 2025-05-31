"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import YouTubeInput from "@/components/YouTubeInput";
import SummaryHistory from "@/components/SummaryHistory";
import VideoPreview from "@/components/VideoPreview";
import axios from "axios";
import {
  Award,
  Badge,
  BookOpen,
  Brain,
  Clock,
  Download,
  Globe,
  Play,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import SummaryDisplay from "@/components/SummaryDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube video URL");
      return;
    }

    setIsLoading(true);
    setSummary(null);

    try {
      const response = await axios.post("/api/generate-summary", { url });
      const data = response.data;

      setSummary(data);

      // Save to local history (max 10 items)
      const history = JSON.parse(
        localStorage.getItem("youtube-summary-history") || "[]"
      );
      const newHistory = [
        {
          id: Date.now().toString(),
          title: data.title,
          url,
          summary: data,
          timestamp: new Date().toISOString(),
        },
        ...history.slice(0, 9),
      ];

      localStorage.setItem(
        "youtube-summary-history",
        JSON.stringify(newHistory)
      );

      toast.success("Summary Generated Successfully! 🎉");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* 🔵 Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full opacity-25 animate-bounce delay-1000" />
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500" />
      </div>
      {/* <Header /> */}
      {/* 🧠 Main UI */}
      <div className="relative z-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-orange-100 shadow-2xl hover-lift">
              <YouTubeInput
                url={url}
                setUrl={setUrl}
                onGenerate={handleGenerateSummary}
                isLoading={isLoading}
              />
              <VideoPreview url={url} />
            </Card>
          </div>
          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
              <div className="text-center mt-4">
                <p className="text-gray-600 animate-pulse">
                  🤖 AI is analyzing your video... This might take a moment!
                </p>
              </div>
            </div>
          )}

          {summary && !isLoading && (
            <div className="mt-8">
              {/* Action Buttons */}
              {/* <div className="flex justify-center gap-3 mb-6">
                <Button
                  onClick={handleDownloadSummary}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover-lift"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Summary
                </Button>
                <Button
                  onClick={handleShareSummary}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover-lift"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Summary
                </Button>
              </div> */}

              <SummaryDisplay summary={summary} />
            </div>
          )}

          {!summary && !isLoading && (
            <div className="mt-8 text-center py-16">
              <div className="relative">
                <Youtube className="w-24 h-24 text-gray-300 mx-auto mb-6 animate-float" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                Ready to Get Started? 🎬
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Paste any YouTube URL above and watch the magic happen!
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-orange-100 text-orange-700 px-4 py-2 hover-lift">
                  <Play className="w-4 h-4 mr-2" />
                  Educational Videos
                </Badge>
                <Badge className="bg-red-100 text-red-700 px-4 py-2 hover-lift">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tutorials
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 px-4 py-2 hover-lift">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Tech Reviews
                </Badge>
              </div>
            </div>
          )}
          {/* 🧾 Summary History */}
          {/* <SummaryHistory /> */}
          {/* Testimonials Section */}
          {/* <TestimonialsSection /> */}
          {/* FAQ Section */}
          {/* <FAQSection /> */}
        </div>
      </div>
    </div>
  );
}

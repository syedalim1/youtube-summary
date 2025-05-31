"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Sparkles } from "lucide-react";


const YouTubeInput = ({
  url,
  setUrl,
  onGenerate,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="youtube-url"
          className="block text-lg font-semibold text-gray-700 mb-3"
        >
          📺 Enter YouTube Video URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Youtube className="h-5 w-5 text-red-500" />
          </div>
          <Input
            id="youtube-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl"
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !url.trim()}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Generating Summary...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-3" />
            Generate Thanglish Summary! 🚀
          </>
        )}
      </Button>
    </form>
  );
};

export default YouTubeInput;

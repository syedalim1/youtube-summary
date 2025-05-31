"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, ThumbsUp, Calendar } from "lucide-react";

const YOUTUBE_API_KEY =
  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ||
  "AIzaSyDXICM7Z7eJ803RwdjX5N8KbE9fypErZJ0";

const VideoPreview = ({ url }) => {
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com.*[?&]v=|youtu\.be\/)([^"&?/ ]{11})/
    );
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchVideoData = async (videoId) => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics`
        );

        const video = data.items[0];
        if (!video) return;

        const parseDuration = (isoDuration) => {
          const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
          const hours = match[1] ? parseInt(match[1]) : 0;
          const minutes = match[2] ? parseInt(match[2]) : 0;
          const seconds = match[3] ? parseInt(match[3]) : 0;
          return `${hours ? hours + "h " : ""}${minutes}m ${seconds}s`;
        };

        setVideoData({
          title: video.snippet.title,
          channelName: video.snippet.channelTitle,
          publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
          thumbnail: video.snippet.thumbnails.high.url,
          duration: parseDuration(video.contentDetails.duration),
          views: `${Number(video.statistics.viewCount).toLocaleString()} views`,
          likes: `${Number(video.statistics.likeCount || 0).toLocaleString()}`,
          description: video.snippet.description,
        });
      } catch (err) {
        console.error("YouTube API error", err);
      } finally {
        setLoading(false);
      }
    };

    const videoId = extractVideoId(url);
    if (!url || !videoId) {
      setVideoData(null);
      return;
    }

    setLoading(true);
    fetchVideoData(videoId);
  }, [url]);

  if (!url || loading) {
    return (
      <div className="mt-6">
        <Card className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-32 h-20 bg-gray-300 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
                <div className="h-3 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!videoData) return null;

  return (
    <div className="mt-6">
      <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative group cursor-pointer">
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className="w-32 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-8 h-8 text-white" />
              </div>
              <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs flex items-center gap-1 px-2 py-0.5">
                <Clock className="w-3 h-3" />
                {videoData.duration}
              </Badge>
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                {videoData.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {videoData.views}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {videoData.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {videoData.publishedAt}
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {videoData.description}
              </p>

              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  📺 {videoData.channelName}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700 border-green-300"
                >
                  ✅ Ready for Summary
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPreview;

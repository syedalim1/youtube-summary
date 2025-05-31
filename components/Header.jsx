"use client";
import React, { useEffect, useState } from "react";

import {
  Award,
  Brain,
  Clock,
  Globe,
  Sparkles,
  Star,
  Users,
  Youtube,
  Zap,
} from "lucide-react";

function Header() {
  const [stats, setStats] = useState({
    videos: 1247,
    users: 5632,
    time: 2847,
  });

  // 🔁 Animated Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        videos: prev.videos + Math.floor(Math.random() * 3),
        users: prev.users + Math.floor(Math.random() * 5),
        time: prev.time + Math.floor(Math.random() * 10),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative p-4 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-500">
                <Youtube className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-500 via-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                YouTube
              </span>{" "}
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                Summary
              </span>{" "}
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                Generator
              </span>
            </h1>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75"></div>
              <div className="relative p-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full text-white shadow-xl hover:scale-110 transition-all duration-500">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6 hover:scale-105 transition-all duration-300">
            Transform any YouTube video into easy-to-understand{" "}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold">
              Thanglish
            </span>{" "}
            summaries! Perfect for students, busy professionals, and Tamil
            speakers worldwide{" "}
            <span className="inline-block animate-bounce">🚀</span>
          </p>

          {/* Enhanced Live Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center hover:scale-110 transition-all duration-300 hover:rotate-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-50 animate-pulse"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg p-4 border-2 border-orange-200 shadow-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent animate-pulse">
                    {stats.videos.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Videos Summarized
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center hover:scale-110 transition-all duration-300 hover:-rotate-3">
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg blur opacity-50 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg p-4 border-2 border-red-200 shadow-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    {stats.users.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Happy Users
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center hover:scale-110 transition-all duration-300 hover:rotate-3">
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur opacity-50 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-lg p-4 border-2 border-pink-200 shadow-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    {stats.time.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Hours Saved
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer">
                <Star className="w-4 h-4 mr-2 inline animate-spin" />
                <span className="font-semibold">AI-Powered</span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-50 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="relative bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-110 hover:-rotate-3 transition-all duration-300 cursor-pointer">
                <Zap className="w-4 h-4 mr-2 inline animate-bounce" />
                <span className="font-semibold">Lightning Fast</span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-50 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer">
                <Globe className="w-4 h-4 mr-2 inline animate-pulse" />
                <span className="font-semibold">Thanglish Style</span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-50 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-110 hover:-rotate-3 transition-all duration-300 cursor-pointer">
                <Award className="w-4 h-4 mr-2 inline animate-bounce" />
                <span className="font-semibold">Free Forever</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-rotate-2 group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-30"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-all duration-500">
                  <Brain className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AI-Powered
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI analyzes and summarizes videos with 95% accuracy
              </p>
            </div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-2 group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse opacity-30"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-all duration-500">
                  <Clock className="w-10 h-10 text-white animate-bounce" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Save Time
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get key insights in 30 seconds instead of watching hours of
                content
              </p>
            </div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-rotate-2 group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse opacity-30"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-all duration-500">
                  <Sparkles className="w-10 h-10 text-white animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Thanglish Style
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simple Tamil-English mix with emojis for easy understanding
              </p>
            </div>
          </div>

          <div className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-2 group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse opacity-30"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-all duration-500">
                  <Users className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of Tamil learners and content creators
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Header;

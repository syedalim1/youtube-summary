"use client";

import { Brain, Youtube, Sparkles, Zap, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    { icon: Youtube, text: "Fetching video transcript", emoji: "📺" },
    { icon: Brain, text: "Analyzing with Gemini AI", emoji: "🧠" },
    { icon: Sparkles, text: "Creating Thanglish summary", emoji: "✨" },
    { icon: Zap, text: "Adding emojis & formatting", emoji: "⚡" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (prev < steps.length - 1) {
          setCompletedSteps((current) => [...current, prev]);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main Spinner */}
      <div className="relative mb-8">
        {/* Outer spinning rings */}
        <div className="w-24 h-24 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500"></div>
        <div className="absolute inset-2 w-20 h-20 border-4 border-red-200 rounded-full animate-spin border-t-red-500 animate-reverse"></div>
        <div className="absolute inset-4 w-16 h-16 border-4 border-pink-200 rounded-full animate-spin border-t-pink-500"></div>

        {/* Center icon with glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-glow">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="text-center space-y-6 max-w-md">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🤖 AI Magic in Progress...
        </h3>

        {/* Progress Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);

            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 scale-105"
                    : isCompleted
                    ? "bg-green-50 border-2 border-green-200"
                    : "bg-gray-50 border border-gray-200 opacity-60"
                }`}
              >
                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-red-500 animate-pulse"
                      : isCompleted
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 text-white ${
                        isActive ? "animate-bounce" : ""
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div
                    className={`font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-orange-700"
                        : isCompleted
                        ? "text-green-700"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="mr-2">{step.emoji}</span>
                    {step.text}
                  </div>
                </div>

                {isActive && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium mb-2">
            💡 Did you know?
          </p>
          <p className="text-xs text-blue-600">
            Our AI can process a 1-hour video transcript in just 30 seconds!
            That's like reading 150 pages per minute! 🚀
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span>Usually takes 10-30 seconds</span>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

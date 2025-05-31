import React from "react";

function sample() {
  return (
    <div>
     
     
      {/* Enhanced Footer */}
      <div className="text-center mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 shadow-lg max-w-2xl mx-auto hover-lift">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Made with ❤️ for Tamil Speakers
          </h3>
          <p className="text-gray-600 mb-4">
            Empowering Tamil learners worldwide with AI-powered video summaries
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 hover-lift">
              🇮🇳 Made in India
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 hover-lift">
              🌱 Open Source
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 hover-lift">
              🚀 Always Free
            </Badge>
          </div>
        </div>
      </div>
     
    </div>
  );
}
export default sample;

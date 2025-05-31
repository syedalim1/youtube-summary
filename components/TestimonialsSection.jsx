
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, User, Heart, ThumbsUp } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student",
    avatar: "👩‍🎓",
    rating: 5,
    text: "This app is a game-changer! I can quickly understand complex tech videos in simple Thanglish. Perfect for my studies! 🚀",
    location: "Chennai"
  },
  {
    name: "Rajesh Kumar",
    role: "Software Developer",
    avatar: "👨‍💻",
    rating: 5,
    text: "Amazing tool! Saves me hours of watching long tutorials. The AI summaries are spot-on and the Thanglish style is perfect! 💯",
    location: "Bangalore"
  },
  {
    name: "Meera Patel",
    role: "Content Creator",
    avatar: "🎬",
    rating: 5,
    text: "Love how it breaks down YouTube videos into digestible points. The emojis make it so engaging! My audience loves it too! ❤️",
    location: "Mumbai"
  },
  {
    name: "Arjun Reddy",
    role: "Business Analyst",
    avatar: "📊",
    rating: 5,
    text: "Perfect for staying updated with industry trends. Quick summaries help me consume more content in less time! 📈",
    location: "Hyderabad"
  },
  {
    name: "Kavya Nair",
    role: "Medical Student",
    avatar: "👩‍⚕️",
    rating: 5,
    text: "Excellent for educational videos! The AI understands context perfectly and presents it in easy Tamil-English mix! 🎯",
    location: "Kochi"
  },
  {
    name: "Vikram Singh",
    role: "Entrepreneur",
    avatar: "🚀",
    rating: 5,
    text: "This tool is revolutionary! Helps me quickly grasp business concepts from YouTube. The download feature is fantastic! 💼",
    location: "Delhi"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-16 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            ❤️ Loved by Tamil Speakers Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy users who are saving time and learning faster with our AI-powered summaries!
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card 
            className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl animate-bounce">
                  {currentTestimonial.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-8 h-8 text-orange-500" />
                    <div className="flex">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    "{currentTestimonial.text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-orange-600 font-medium">
                        {currentTestimonial.role}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        📍 {currentTestimonial.location}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                        <Heart className="w-3 h-3 mr-1" />
                        Verified User
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-3 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-orange-300'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-orange-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-red-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-red-600">10K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-pink-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📺</div>
              <div className="text-2xl font-bold text-pink-600">50K+</div>
              <div className="text-sm text-gray-600">Videos Summarized</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⏰</div>
              <div className="text-2xl font-bold text-green-600">1M+</div>
              <div className="text-sm text-gray-600">Hours Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              🚀 Ready to Join the Community?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Start summarizing YouTube videos in Thanglish today and save hours of your time!
            </p>
            <div className="flex justify-center gap-4">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                100% Free
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <User className="w-4 h-4 mr-2" />
                No Sign-up Required
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Zap,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const faqs = [
  {
    icon: "🤖",
    question: "How accurate are the AI-generated summaries?",
    answer:
      "Our AI uses Google's advanced Gemini model with 95%+ accuracy. It understands context, identifies key points, and presents them in easy Thanglish style with relevant emojis for better engagement.",
  },
  {
    icon: "⚡",
    question: "How fast is the summarization process?",
    answer:
      "Most videos are summarized within 10-30 seconds! Our AI can process a 1-hour video transcript faster than you can read a single page. Lightning-fast results every time! 🚀",
  },
  {
    icon: "🌍",
    question: "What languages does it support?",
    answer:
      "Currently optimized for English YouTube videos with summaries in Thanglish (Tamil-English mix). We're working on adding support for Tamil, Hindi, and other Indian languages soon!",
  },
  {
    icon: "💰",
    question: "Is this service really free?",
    answer:
      "Yes, 100% free forever! No hidden charges, no subscription fees, no sign-up required. We believe in making AI-powered education accessible to everyone, especially Tamil speakers! ❤️",
  },
  {
    icon: "📱",
    question: "Can I use this on mobile devices?",
    answer:
      "Absolutely! Our app is fully responsive and works perfectly on smartphones, tablets, and desktops. Summarize videos on-the-go and save them for offline reading! 📲",
  },
  {
    icon: "🔒",
    question: "Is my data safe and private?",
    answer:
      "Your privacy is our priority! We don't store your YouTube URLs or personal data. All processing happens securely, and summaries are generated in real-time without saving your information. 🛡️",
  },
  {
    icon: "📚",
    question: "What types of videos work best?",
    answer:
      "Educational content, tutorials, tech reviews, business talks, and how-to videos work excellently! Videos with clear speech and captions give the best results. Perfect for students and professionals! 🎓",
  },
  {
    icon: "💾",
    question: "Can I save or share the summaries?",
    answer:
      "Yes! You can download summaries as text files, copy to clipboard, or share directly with friends. Perfect for study groups, team meetings, or social media sharing! 📤",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white animate-pulse">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-white animate-bounce">
              <Lightbulb className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers! Everything you need to know about
            our AI-powered YouTube summarizer 🤔✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  openIndex === index
                    ? "border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg"
                    : "border-gray-200 bg-white/80 hover:border-blue-200"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`text-3xl transition-transform duration-300 ${
                          openIndex === index ? "scale-110" : ""
                        }`}
                      >
                        {faq.icon}
                      </div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          openIndex === index
                            ? "text-blue-700"
                            : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      {openIndex === index ? (
                        <ChevronUp className="w-6 h-6 text-blue-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-96 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-16 pr-8">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 animate-pulse" />
                <h3 className="text-2xl font-bold">Still Have Questions?</h3>
                <Shield className="w-8 h-8 animate-pulse" />
              </div>
              <p className="text-lg mb-6 opacity-90">
                We're here to help! Our AI-powered tool is designed to be simple
                and intuitive, but if you need any assistance, don't hesitate to
                reach out.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                  <span>📧</span>
                  <span className="text-sm">Email Support</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                  <span>💬</span>
                  <span className="text-sm">Live Chat</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                  <span>📚</span>
                  <span className="text-sm">Help Center</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

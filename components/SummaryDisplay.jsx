
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SummaryDisplay = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const summaryText = `
📺 ${summary.title}

📋 Main Points:
${summary.summary_points
  .map((point, index) => `${index + 1}. ${point.point}`)
  .join("\n")}

💡 Final Tip: ${summary.final_tip}
    `.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      toast({
        title: "Copied! 📋",
        description: "Summary copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🎯 Your Video Summary
        </h2>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex items-center gap-2 hover:bg-orange-50"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Main Summary Card */}
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="text-xl text-gray-800 flex items-start gap-3">
            <span className="text-2xl">📺</span>
            <span>{summary.title}</span>
          </CardTitle>
          {(summary.video_duration || summary.difficulty_level) && (
            <div className="flex gap-2 mt-3">
              {summary.video_duration && (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700"
                >
                  ⏱️ {summary.video_duration}
                </Badge>
              )}
              {summary.difficulty_level && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  📊 {summary.difficulty_level}
                </Badge>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          {/* Summary Points */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              📋 Main Points:
            </h3>
            <div className="space-y-3">
              {summary.summary_points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100 hover:shadow-md transition-all duration-200"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{point.point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Tip */}
          {summary.final_tip && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                💡 Final Tip:
              </h3>
              <p className="text-green-700 text-lg leading-relaxed font-medium">
                {summary.final_tip}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-orange-50 border-orange-200"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🔄 Summarize Another Video
        </Button>
      </div>
    </div>
  );
};

export default SummaryDisplay;

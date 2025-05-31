
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Trash2, Download, Share2, Clock, Youtube, Star } from 'lucide-react';

const SummaryHistory = () => {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('youtube-summary-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (error) {
        console.error('Failed to parse history from localStorage:', error);
      }
    }
  }, []);

  const addToHistory = (title, url, summary) => {
    const newItem = {
      id: Date.now().toString(),
      title,
      url,
      summary,
      timestamp: new Date()
    };

    const updatedHistory = [newItem, ...history.slice(0, 9)]; // Keep only 10 items
    setHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('youtube-summary-history', JSON.stringify(updatedHistory));
  };

  const removeFromHistory = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('youtube-summary-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('youtube-summary-history');
  };

  const downloadSummary = (item) => {
    const summaryText = `
📺 ${item.summary.title}

📋 Main Points:
${item.summary.summary_points.map((point, index) => `${index + 1}. ${point.point}`).join('\n')}

💡 Final Tip: ${item.summary.final_tip}

Generated on: ${item.timestamp.toLocaleDateString()}
Original URL: ${item.url}
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${item.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rateItem = (id, rating) => {
    const updatedHistory = history.map(item => 
      item.id === id ? { ...item, rating } : item
    );
    setHistory(updatedHistory);
    localStorage.setItem('youtube-summary-history', JSON.stringify(updatedHistory));
  };

  if (!showHistory) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowHistory(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <History className="w-6 h-6" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {history.length}
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="w-6 h-6" />
              Summary History ({history.length})
            </CardTitle>
            <div className="flex gap-2">
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-white border-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(false)}
                className="text-white border-white hover:bg-white/20"
              >
                ✕ Close
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-y-auto max-h-[60vh]">
          {history.length === 0 ? (
            <div className="p-12 text-center">
              <Youtube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No History Yet</h3>
              <p className="text-gray-500">Start summarizing videos to see your history here!</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {history.map((item) => (
                <Card key={item.id} className="border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                          {item.summary.title}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.summary.summary_points?.length || 0} points
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {item.summary.summary_points?.[0]?.point || 'No preview available'}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-600">Rate this summary:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => rateItem(item.id, star)}
                                className={`transition-colors ${
                                  (item.rating || 0) >= star 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300 hover:text-yellow-300'
                                }`}
                              >
                                <Star className="w-4 h-4 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadSummary(item)}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          Copy URL
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromHistory(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryHistory;

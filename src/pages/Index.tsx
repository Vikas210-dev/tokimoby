import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";

const videos = [
  {
    id: 1,
    title: "Love Beyond Words",
    duration: "5:24",
    language: "Hindi",
    thumbnail: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=700&fit=crop",
    views: "2.3M",
  },
  {
    id: 2,
    title: "The Last Goodbye",
    duration: "3:45",
    language: "English",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=700&fit=crop",
    views: "1.8M",
  },
  {
    id: 3,
    title: "வீட்டுக்கு வா",
    duration: "4:12",
    language: "Tamil",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop",
    views: "950K",
  },
  {
    id: 4,
    title: "Dreams of Tomorrow",
    duration: "6:08",
    language: "English",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=700&fit=crop",
    views: "3.1M",
  },
  {
    id: 5,
    title: "माँ की ममता",
    duration: "4:55",
    language: "Hindi",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=700&fit=crop",
    views: "2.7M",
  },
  {
    id: 6,
    title: "Friendship Forever",
    duration: "3:30",
    language: "English",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=700&fit=crop",
    views: "1.2M",
  },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StoryFlix
            </h1>
            <div className="text-xs text-muted-foreground">
              Watch Stories. Feel Emotions.
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search stories..."
              className="pl-10 h-12 rounded-2xl bg-card border-border"
            />
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 animate-fade-in">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

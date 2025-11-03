import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import LanguageFilter from "@/components/LanguageFilter";
import VideoCard from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { videosByLanguage } from "@/data/videos";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Get 5 videos from each language for the home page (15 total)
  const homeVideos = [
    ...videosByLanguage.en.slice(0, 5),
    ...videosByLanguage.fr.slice(0, 5),
    ...videosByLanguage.es.slice(0, 5),
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Tokimoby
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

      {/* Language Filter */}
      <div className="mt-4">
        <LanguageFilter />
      </div>

      {/* Video Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 animate-fade-in">
        {homeVideos.map((video) => (
          <VideoCard
            key={`${video.language}-${video.id}`}
            title={video.title}
            duration={video.duration}
            language={video.language}
            thumbnail={video.thumbnail}
            views={video.views}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

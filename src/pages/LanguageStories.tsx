import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import VideoPlayer from "@/components/VideoPlayer";
import { Input } from "@/components/ui/input";
import { videosByLanguage, VideoData } from "@/data/videos";

const languageNames: { [key: string]: { name: string; flag: string } } = {
  en: { name: "English", flag: "EN" },
  fr: { name: "French", flag: "FR" },
  es: { name: "Spanish", flag: "ES" },
};

const LanguageStories = () => {
  const navigate = useNavigate();
  const { languageCode } = useParams<{ languageCode: string }>();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Validate language code
  const validLanguageCodes = ["en", "fr", "es"];
  const currentLanguageCode = languageCode && validLanguageCodes.includes(languageCode) 
    ? languageCode 
    : "en";

  // Get videos for the selected language
  const videos = videosByLanguage[currentLanguageCode as keyof typeof videosByLanguage] as VideoData[];
  const languageInfo = languageNames[currentLanguageCode];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="p-4 space-y-4">
          {/* Title with Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-card rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-3xl">{languageInfo.flag}</span>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {languageInfo.name} Stories
              </h1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={`Search ${languageInfo.name} stories...`}
              className="pl-10 h-12 rounded-2xl bg-card border-border"
            />
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="p-4">
        <div className="mb-4">
          <p className="text-muted-foreground">
            {videos.length} {videos.length === 1 ? 'story' : 'stories'} available
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoPlayer
                key={video.id}
                embedUrl={video.embedUrl}
                title={video.title}
                duration={video.duration}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {languageInfo.name} stories available yet.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Check back soon for more content!
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default LanguageStories;

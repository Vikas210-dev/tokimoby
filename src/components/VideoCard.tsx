import { Play } from "lucide-react";
import { useState } from "react";
import VideoPlayerModal from "./VideoPlayerModal";

interface VideoCardProps {
  title: string;
  duration: string;
  language: string;
  embedUrl: string;
  views?: string;
}

const VideoCard = ({ title, duration, language, embedUrl, views }: VideoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 cursor-pointer"
      >
        {/* Video Embed (as thumbnail) */}
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0 pointer-events-none"
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
            title={title}
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold pointer-events-none z-10">
            {duration}
          </div>

          {/* Language Badge */}
          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground pointer-events-none z-10">
            {language}
          </div>
        </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
        {views && (
          <p className="text-xs text-muted-foreground">{views} views</p>
        )}
      </div>
    </div>

    {/* Video Player Modal */}
    {isModalOpen && (
      <VideoPlayerModal
        embedUrl={embedUrl}
        title={title}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </>
  );
};

export default VideoCard;

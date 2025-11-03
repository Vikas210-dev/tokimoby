import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import VideoPlayerModal from "./VideoPlayerModal";

interface VideoPlayerProps {
  embedUrl: string;
  title: string;
  duration: string;
}

const VideoPlayer = ({ embedUrl, title, duration }: VideoPlayerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isVisible]);

  return (
    <>
      <div 
        ref={videoRef} 
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all animate-fade-in cursor-pointer hover:scale-105"
      >
        <div className="relative" style={{ paddingTop: "56.25%" }}> {/* 16:9 aspect ratio for landscape videos */}
          {isVisible ? (
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40">
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                </div>
              </div>
              
              {/* Thumbnail placeholder */}
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <Play className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          )}

          {/* Duration Badge */}
          {duration && (
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold z-10">
              {duration}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-3">
          <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
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

export default VideoPlayer;

import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  duration: string;
  language: string;
  thumbnail: string;
  views?: string;
}

const VideoCard = ({ title, duration, language, thumbnail, views }: VideoCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary transition-all hover:scale-105 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
          {duration}
        </div>

        {/* Language Badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
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
  );
};

export default VideoCard;

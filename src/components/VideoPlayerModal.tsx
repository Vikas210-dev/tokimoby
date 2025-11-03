import { X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoPlayerModalProps {
  embedUrl: string;
  title: string;
  onClose: () => void;
}

const VideoPlayerModal = ({ embedUrl, title, onClose }: VideoPlayerModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    console.log("VideoPlayerModal mounted", embedUrl);
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleOpenInNewTab = () => {
    window.open(embedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen w-full flex flex-col py-4">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground line-clamp-1 flex-1">
              {title}
            </h2>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInNewTab();
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open in Tab</span>
            </button> */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-card hover:bg-muted flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div 
          className="flex-1 flex items-center justify-center px-4 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-5xl">
            {/* 16:9 Responsive Video Container */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-border/50" style={{ paddingTop: "56.25%" }}>
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}
              
              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                  <div className="text-center p-6 max-w-md">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Cannot Load Video</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This video cannot be embedded here. Click below to watch it in a new tab.
                    </p>
                    <button
                      onClick={handleOpenInNewTab}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Watch in New Tab
                    </button>
                  </div>
                </div>
              )}

              <iframe
                src={embedUrl}
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  display: hasError ? 'none' : 'block',
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen={true}
                title={title}
                onLoad={() => {
                  setIsLoading(false);
                  // Check if iframe loaded successfully
                  setTimeout(() => {
                    const iframe = document.querySelector('iframe');
                    if (iframe) {
                      try {
                        // Try to access iframe content to check if it loaded
                        iframe.contentWindow;
                      } catch (e) {
                        setHasError(true);
                      }
                    }
                  }, 1000);
                }}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            </div>
            
            {/* Video Info */}
            {/* <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {hasError 
                  ? "Use the 'Open in Tab' button above to watch this video" 
                  : "Click outside or press ESC to close"
                }
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;

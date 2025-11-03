// Import video data from separate language files
import { englishVideos } from './englishVideos';
import { frenchVideos } from './frenchVideos';
import { spanishVideos } from './spanishVideos';

// Video interface
export interface Video {
  id: number;
  title: string;
  duration: string;
  embedUrl: string;
  language: string;
  thumbnail: string;
  views: string;
}

// Type alias for compatibility
export type VideoData = Video;

// Video data organized by language
export const videosByLanguage = {
  en: englishVideos,
  fr: frenchVideos,
  es: spanishVideos,
};

// Get all videos mixed from all languages
export const getAllVideos = (): VideoData[] => {
  return [
    ...videosByLanguage.en,
    ...videosByLanguage.fr,
    ...videosByLanguage.es,
  ];
};

# StoryFlix - Video Component Structure

## Overview
The home page now features a language filter system with modular components for better maintainability.

## Components

### 1. **LanguageFilter** (`src/components/LanguageFilter.tsx`)
- Displays language selection buttons (English, Français, Español)
- Highlights the currently selected language
- Horizontal scrollable on mobile
- Clean, accessible button design

**Props:**
- `selectedLanguage`: Current active language code
- `onLanguageChange`: Callback when language is changed

### 2. **VideoPlayer** (`src/components/VideoPlayer.tsx`)
- Lazy-loading video iframe component
- Only loads videos when they scroll into view
- Shows loading spinner while iframe loads
- Displays video title and duration
- 9:16 aspect ratio (vertical video format)

**Props:**
- `embedUrl`: The iframe embed URL
- `title`: Video title
- `duration`: Video duration string

### 3. **Video Data** (`src/data/videos.ts`)
- Centralized video data storage
- Organized by language code (`en`, `fr`, `es`)
- Easy to add new videos for any language

## How It Works

1. User sees language filter buttons at the top of the home page
2. Clicking a language filters videos to show only that language's content
3. Videos lazy-load as user scrolls (improves performance)
4. Empty state shown if no videos exist for selected language

## Adding New Videos

To add videos for French or Spanish:

```typescript
// In src/data/videos.ts
export const videosByLanguage = {
  // ... existing English videos
  fr: [
    {
      id: 1,
      title: "Your French Video Title",
      duration: "5:24",
      embedUrl: "https://iframe.mediadelivery.net/embed/...",
      language: "Français",
    },
  ],
  es: [
    // Spanish videos here
  ],
};
```

## Features

✅ Modular component architecture  
✅ Lazy loading for performance  
✅ Language filtering  
✅ Responsive design  
✅ Smooth animations  
✅ Loading states  
✅ Empty states  

## Future Enhancements

- Search functionality integration
- Video thumbnails before load
- View counts
- Video categories/tags
- User favorites

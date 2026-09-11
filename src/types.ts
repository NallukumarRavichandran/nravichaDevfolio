export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CBTEntry {
  id: string;
  mood: string;
  moodEmoji: string;
  thought: string;
  reframed: string;
  date: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  likes: number;
  comments: { user: string; text: string; date: string }[];
}

export interface MineCell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export interface WallpaperOption {
  id: string;
  name: string;
  style: React.CSSProperties;
  colorHex: string;
  thumbnailGradient: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  bpm: number;
  chords: number[]; // frequencies
}

export interface OutlookEmail {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
  tag?: string;
}

export interface BalloonNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  icon?: string;
}

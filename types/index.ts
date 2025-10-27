/**
 * Tipos centralizados para todo o projeto
 * Mantém a tipagem consistente e evita duplicação
 */

// Wellness & Health
export interface WellnessEntry {
  level: number;
  timestamp: Date;
}

// Meditation
export interface MeditationSession {
  id: string;
  duration: number;
  title: string;
  description: string;
}

export interface SessionHistory {
  sessionId: string;
  date: Date;
  completed: boolean;
}

// Gratitude
export interface GratitudeEntry {
  id: string;
  text: string;
  date: Date;
}

// Mood
export interface MoodEntry {
  date: Date;
  mood: number;
  reasons?: string[];
}

// Achievement
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// Article
export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  readTime: number;
  isFavorite?: boolean;
}

// Settings
export interface Settings {
  notifications: boolean;
  dailyReminders: boolean;
  soundEnabled: boolean;
  userName: string;
}

// Component Props
export interface ContainerStyleProp {
  containerStyle?: any;
}

export interface ThemedViewProps {
  lightColor?: string;
  darkColor?: string;
}

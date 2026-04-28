// Type definitions for the application

export interface Settings {
  [key: string]: string;
}

export interface Section {
  id: number;
  name: string;
  content: string;
  video_url?: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  created_at: string;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
}

export interface SettingRow {
  key: string;
  value: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  data?: T;
  id?: number;
}

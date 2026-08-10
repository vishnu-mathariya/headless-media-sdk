export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  avgColor?: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

export interface VideoFile {
  id: number;
  quality: string;
  fileType: string;
  width?: number;
  height?: number;
  fps?: number;
  link: string;
}

export interface VideoPicture {
  id: number;
  nr: number;
  picture: string;
}

export interface Video {
  id: number;
  width: number;
  height: number;
  duration: number;
  fullRes?: string;
  tags?: string[];
  url: string;
  image: string;
  user: {
    id: number;
    name: string;
    url: string;
  };
  videoFiles: VideoFile[];
  videoPictures: VideoPicture[];
}

export type MediaItem = Photo | Video;
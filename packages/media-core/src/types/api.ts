import type { Photo, Video } from "./media";

export interface PexelsPagination {
  page: number;
  per_page: number;
  total_results?: number;
  next_page?: string;
  prev_page?: string;
}

export interface PexelsPhotoResponse extends PexelsPagination {
  photos: Photo[];
}

export interface PexelsVideoResponse extends PexelsPagination {
  videos: Video[];
}

export interface PexelsApiError {
  error?: string;
}
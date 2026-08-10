export const PEXELS_API_BASE_URL = "https://api.pexels.com";

export const PEXELS_ENDPOINTS = {
  searchPhotos: "/v1/search",
  curatedPhotos: "/v1/curated",
  photo: (id: number | string) => `/v1/photos/${id}`,
  searchVideos: "/videos/search",
  popularVideos: "/videos/popular",
  video: (id: number | string) => `/videos/videos/${id}`
} as const;
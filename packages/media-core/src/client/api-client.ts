import {
  PEXELS_API_BASE_URL,
  PEXELS_ENDPOINTS
} from "./endpoints";

import type {
  PexelsPhotoResponse,
  PexelsVideoResponse
} from "../types/api";

import type {
  Photo,
  Video
} from "../types/media";

export interface PexelsClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class PexelsApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: PexelsClientOptions) {
    if (!options.apiKey?.trim()) {
      throw new Error("Pexels API key is required.");
    }

    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? PEXELS_API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });

    const response = await fetch(url, {
      headers: {
        Authorization: this.apiKey
      }
    });

    if (!response.ok) {
      let message = `Pexels API request failed with status ${response.status}.`;

      try {
        const errorBody = (await response.json()) as {
          error?: string;
        };

        if (errorBody.error) {
          message = errorBody.error;
        }
      } catch {
        // Keep default error message.
      }

      throw new Error(message);
    }

    return response.json() as Promise<T>;
  }

  async searchPhotos(
    query: string,
    page = 1,
    perPage = 20
  ): Promise<PexelsPhotoResponse> {
    return this.request<PexelsPhotoResponse>(
      PEXELS_ENDPOINTS.searchPhotos,
      {
        query,
        page,
        per_page: perPage
      }
    );
  }

  async getCuratedPhotos(
    page = 1,
    perPage = 20
  ): Promise<PexelsPhotoResponse> {
    return this.request<PexelsPhotoResponse>(
      PEXELS_ENDPOINTS.curatedPhotos,
      {
        page,
        per_page: perPage
      }
    );
  }

  async getPhoto(id: number): Promise<Photo> {
    return this.request<Photo>(
      PEXELS_ENDPOINTS.photo(id)
    );
  }

  async searchVideos(
    query: string,
    page = 1,
    perPage = 20
  ): Promise<PexelsVideoResponse> {
    return this.request<PexelsVideoResponse>(
      PEXELS_ENDPOINTS.searchVideos,
      {
        query,
        page,
        per_page: perPage
      }
    );
  }

  async getPopularVideos(
    page = 1,
    perPage = 20
  ): Promise<PexelsVideoResponse> {
    return this.request<PexelsVideoResponse>(
      PEXELS_ENDPOINTS.popularVideos,
      {
        page,
        per_page: perPage
      }
    );
  }

  async getVideo(id: number): Promise<Video> {
    return this.request<Video>(
      PEXELS_ENDPOINTS.video(id)
    );
  }
}
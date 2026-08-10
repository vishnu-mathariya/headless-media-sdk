import { PexelsApiClient } from "./client/api-client";
import { AuthManager } from "./auth/auth";
import { MemoryCache } from "./cache/cache";
import { MediaEventEmitter } from "./events/emitter";

import type {
  MediaListResult,
  PaginationParams
} from "./types/common";

import type {
  Photo,
  Video
} from "./types/media";

export interface MediaSdkOptions {
  apiKey: string;
  cacheTtlMs?: number;
}

export class MediaSDK {
  private readonly auth: AuthManager;
  private readonly client: PexelsApiClient;
  private readonly cache: MemoryCache;

  readonly events: MediaEventEmitter;

  private readonly inFlightRequests = new Map<
    string,
    Promise<unknown>
  >();

  constructor(options: MediaSdkOptions) {
    this.auth = new AuthManager({
      apiKey: options.apiKey
    });

    this.client = new PexelsApiClient({
      apiKey: this.auth.getApiKey()
    });

    this.cache = new MemoryCache(
      options.cacheTtlMs ?? 60_000
    );

    this.events = new MediaEventEmitter();
  }

  private async cachedRequest<T>(
    key: string,
    request: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get<T>(key);

    if (cached !== undefined) {
      return cached;
    }

    const existingRequest =
      this.inFlightRequests.get(key);

    if (existingRequest) {
      return existingRequest as Promise<T>;
    }

    const promise = request();

    this.inFlightRequests.set(key, promise);

    try {
      const result = await promise;

      this.cache.set(key, result);

      return result;
    } finally {
      this.inFlightRequests.delete(key);
    }
  }

  async searchPhotos(
    query: string,
    params: PaginationParams = {}
  ): Promise<MediaListResult<Photo>> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const key = `photos:search:${query}:${page}:${perPage}`;

    const response = await this.cachedRequest(
      key,
      () =>
        this.client.searchPhotos(
          query,
          page,
          perPage
        )
    );

    return {
      items: response.photos,
      pagination: {
        page: response.page,
        perPage: response.per_page,
        totalResults: response.total_results,
        hasNextPage: Boolean(response.next_page)
      }
    };
  }

  async getCuratedPhotos(
    params: PaginationParams = {}
  ): Promise<MediaListResult<Photo>> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const key = `photos:curated:${page}:${perPage}`;

    const response = await this.cachedRequest(
      key,
      () =>
        this.client.getCuratedPhotos(
          page,
          perPage
        )
    );

    return {
      items: response.photos,
      pagination: {
        page: response.page,
        perPage: response.per_page,
        totalResults: response.total_results,
        hasNextPage: Boolean(response.next_page)
      }
    };
  }

  async getPhoto(id: number): Promise<Photo> {
    const key = `photo:${id}`;

    return this.cachedRequest(
      key,
      () => this.client.getPhoto(id)
    );
  }

  async searchVideos(
    query: string,
    params: PaginationParams = {}
  ): Promise<MediaListResult<Video>> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const key = `videos:search:${query}:${page}:${perPage}`;

    const response = await this.cachedRequest(
      key,
      () =>
        this.client.searchVideos(
          query,
          page,
          perPage
        )
    );

    return {
      items: response.videos,
      pagination: {
        page: response.page,
        perPage: response.per_page,
        totalResults: response.total_results,
        hasNextPage: Boolean(response.next_page)
      }
    };
  }

  async getPopularVideos(
    params: PaginationParams = {}
  ): Promise<MediaListResult<Video>> {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 20;

    const key = `videos:popular:${page}:${perPage}`;

    const response = await this.cachedRequest(
      key,
      () =>
        this.client.getPopularVideos(
          page,
          perPage
        )
    );

    return {
      items: response.videos,
      pagination: {
        page: response.page,
        perPage: response.per_page,
        totalResults: response.total_results,
        hasNextPage: Boolean(response.next_page)
      }
    };
  }

  async getVideo(id: number): Promise<Video> {
    const key = `video:${id}`;

    return this.cachedRequest(
      key,
      () => this.client.getVideo(id)
    );
  }

  download(mediaId: number): void {
    this.events.emit({
      type: "download",
      mediaId
    });
  }

  view(mediaId: number): void {
    this.events.emit({
      type: "view",
      mediaId
    });
  }
}
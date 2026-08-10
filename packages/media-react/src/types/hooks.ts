import type {
  MediaListResult,
  PaginationParams
} from "@media-sdk/core";

import type {
  Photo,
  Video
} from "@media-sdk/core";

export interface UseMediaSearchOptions
  extends PaginationParams {
  enabled?: boolean;
}

export interface UseMediaSearchResult<T> {
  data: MediaListResult<T> | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseMediaItemResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export type PhotoSearchResult =
  UseMediaSearchResult<Photo>;

export type VideoSearchResult =
  UseMediaSearchResult<Video>;
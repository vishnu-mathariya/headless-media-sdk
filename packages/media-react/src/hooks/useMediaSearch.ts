import {
  useCallback,
  useEffect,
  useState
} from "react";

import type {
  MediaListResult,
  Photo
} from "@media-sdk/core";

import {
  useMediaSDK
} from "../context/MediaProvider";

import type {
  UseMediaSearchOptions,
  PhotoSearchResult
} from "../types/hooks";

export function useMediaSearch(
  query: string,
  options: UseMediaSearchOptions = {}
): PhotoSearchResult {
  const sdk = useMediaSDK();

  const {
    page = 1,
    perPage = 20,
    enabled = true
  } = options;

  const [data, setData] =
    useState<MediaListResult<Photo> | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<Error | null>(null);

  const fetchMedia = useCallback(async () => {
    if (!query.trim() || !enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await sdk.searchPhotos(
        query,
        {
          page,
          perPage
        }
      );

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch media.")
      );
    } finally {
      setLoading(false);
    }
  }, [
    sdk,
    query,
    page,
    perPage,
    enabled
  ]);

  useEffect(() => {
    void fetchMedia();
  }, [fetchMedia]);

  return {
    data,
    loading,
    error,
    refetch: fetchMedia
  };
}
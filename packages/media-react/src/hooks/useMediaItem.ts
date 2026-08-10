import {
  useCallback,
  useEffect,
  useState
} from "react";

import type {
  Photo,
  Video
} from "@media-sdk/core";

import {
  useMediaSDK
} from "../context/MediaProvider";

import type {
  UseMediaItemResult
} from "../types/hooks";

export function useMediaItem(
  id: number | null,
  type: "photo" | "video" = "photo"
): UseMediaItemResult<Photo | Video> {
  const sdk = useMediaSDK();

  const [data, setData] =
    useState<Photo | Video | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<Error | null>(null);

  const fetchMedia = useCallback(async () => {
    if (id === null) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        type === "photo"
          ? await sdk.getPhoto(id)
          : await sdk.getVideo(id);

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch media item.")
      );
    } finally {
      setLoading(false);
    }
  }, [
    sdk,
    id,
    type
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
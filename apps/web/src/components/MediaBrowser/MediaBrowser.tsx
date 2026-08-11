import { useState } from "react";
import type { Photo, Video } from "@media-sdk/core";
import { MediaDetails } from "../MediaDetails/MediaDetails";

import { useMediaSearch, useCuratedMedia } from "@media-sdk/react";

import {
  ErrorState,
  LoadingState,
  MediaGrid,
  Pagination,
  SearchBar,
} from "@media-sdk/ui-react";

export function MediaBrowser() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<Photo | Video | null>(
    null,
  );

  const searchResult = useMediaSearch(query, {
    page,
    perPage: 20,
  });

  const curatedResult = useCuratedMedia({
    page,
    perPage: 20,
  });

  const result = query.trim() ? searchResult : curatedResult;

  if (result.loading) {
    return <LoadingState />;
  }

  if (result.error) {
    return (
      <ErrorState
        error={result.error}
        onRetry={() => {
          void result.refetch();
        }}
      />
    );
  }

  const media = result.data?.items ?? [];

  const hasNextPage = result.data?.pagination.hasNextPage ?? false;

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
    setSelectedMedia(null);
  };

  return (
    <main>
      <header>
        <h1>Headless Media SDK</h1>

        <p>Search and browse media using the Media SDK.</p>

        <SearchBar onSearch={handleSearch} placeholder="Search photos..." />
      </header>

      {media.length > 0 ? (
        <MediaGrid media={media} onSelect={setSelectedMedia} />
      ) : (
        <p>No media found.</p>
      )}

      {selectedMedia && (
        <MediaDetails
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}

      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        onPageChange={setPage}
      />
    </main>
  );
}

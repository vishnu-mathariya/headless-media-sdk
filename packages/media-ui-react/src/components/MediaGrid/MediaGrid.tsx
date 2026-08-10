import type { Photo, Video } from "@media-sdk/core";

import { MediaCard } from "../MediaCard/MediaCard";

export interface MediaGridProps {
  media: Array<Photo | Video>;
  onSelect?: (media: Photo | Video) => void;
}

export function MediaGrid({
  media,
  onSelect
}: MediaGridProps) {
  return (
    <div className="media-grid">
      {media.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
import type { Photo, Video } from "@media-sdk/core";
import { FlatList } from "react-native";

import {
  MediaCard
} from "../MediaCard/MediaCard";

export interface MediaGridProps {
  media: Array<Photo | Video>;
  onSelect?: (media: Photo | Video) => void;
}

export function MediaGrid({
  media,
  onSelect
}: MediaGridProps) {
  return (
    <FlatList
      data={media}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <MediaCard
          media={item}
          onSelect={onSelect}
        />
      )}
    />
  );
}

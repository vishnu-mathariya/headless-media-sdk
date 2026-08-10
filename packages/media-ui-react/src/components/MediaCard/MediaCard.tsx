import React from "react";
import type { Photo, Video } from "@media-sdk/core";

export interface MediaCardProps {
  media: Photo | Video;
  onSelect?: (media: Photo | Video) => void;
}

function isVideo(media: Photo | Video): media is Video {
  return "video_files" in media;
}

export function MediaCard({
  media,
  onSelect
}: MediaCardProps) {
  const imageUrl = isVideo(media)
    ? media.image
    : media.src.medium;

  const title = isVideo(media)
    ? media.user.name
    : media.alt || `Photo by ${media.photographer}`;

  return (
    <article
      className="media-card"
      onClick={() => onSelect?.(media)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="media-card__image"
        loading="lazy"
      />

      <div className="media-card__content">
        <p className="media-card__title">
          {title}
        </p>
      </div>
    </article>
  );
}
import type { Photo, Video } from "@media-sdk/core";

interface MediaDetailsProps {
  media: Photo | Video;
  onClose: () => void;
}

function isVideo(media: Photo | Video): media is Video {
  return "video_files" in media;
}

export function MediaDetails({
  media,
  onClose
}: MediaDetailsProps) {
  const video = isVideo(media);

  const imageUrl = video
    ? media.image
    : media.src.large;

  const title = video
    ? media.user.name
    : media.alt || `Photo by ${media.photographer}`;

  const photographer = video
    ? media.user.name
    : media.photographer;

  return (
    <section className="media-details">
      <button
        type="button"
        onClick={onClose}
      >
        Close
      </button>

      <div>
        <img
          src={imageUrl}
          alt={title}
        />
      </div>

      <div>
        <h2>{title}</h2>

        <p>
          Photographer: {photographer}
        </p>

        {!video && (
          <a
            href={media.url}
            target="_blank"
            rel="noreferrer"
          >
            View on Pexels
          </a>
        )}
      </div>
    </section>
  );
}
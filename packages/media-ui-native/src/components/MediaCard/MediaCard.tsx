import type { Photo, Video } from "@media-sdk/core";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
    <Pressable
      style={styles.card}
      onPress={() => onSelect?.(media)}
    >
      <Image
        source={{ uri: imageUrl }}
        accessibilityLabel={title}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12
  },
  image: {
    width: "100%",
    height: 220
  },
  content: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontWeight: "500"
  }
});

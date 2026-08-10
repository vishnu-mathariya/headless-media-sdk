export type MediaEvent =
  | {
      type: "download";
      mediaId: number;
    }
  | {
      type: "view";
      mediaId: number;
    };

type EventListener = (event: MediaEvent) => void;

export class MediaEventEmitter {
  private readonly listeners = new Set<EventListener>();

  on(listener: EventListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: MediaEvent): void {
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }

  clear(): void {
    this.listeners.clear();
  }
}
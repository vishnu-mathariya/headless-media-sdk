import {
  createContext,
  createElement,
  useContext,
  type ReactNode
} from "react";

import {
  MediaSDK,
  type MediaSdkOptions
} from "@media-sdk/core";

interface MediaContextValue {
  sdk: MediaSDK;
}

const MediaContext =
  createContext<MediaContextValue | null>(null);

interface MediaProviderProps {
  options: MediaSdkOptions;
  children: ReactNode;
}

export function MediaProvider({
  options,
  children
}: MediaProviderProps) {
  const sdk = new MediaSDK(options);

  return createElement(MediaContext.Provider, { value: { sdk } }, children);
}

export function useMediaSDK(): MediaSDK {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error(
      "useMediaSDK must be used inside MediaProvider."
    );
  }

  return context.sdk;
}
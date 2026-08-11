import { MediaProvider } from "@media-sdk/react";

import { MediaBrowser } from "./components/MediaBrowser/MediaBrowser";

function App() {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  if (!apiKey) {
    return (
      <main>
        <h1>Configuration Error</h1>
        <p>
          Pexels API key is not configured.
        </p>
      </main>
    );
  }

  return (
    <MediaProvider
      options={{
        apiKey
      }}
    >
      <MediaBrowser />
    </MediaProvider>
  );
}

export default App;
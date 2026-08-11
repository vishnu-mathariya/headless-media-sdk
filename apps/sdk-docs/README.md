# Media SDK Documentation

## Overview

Headless Media SDK is a framework-agnostic media SDK with React and React Native wrappers.

## Packages

- `@media-sdk/core` - Core media API client and event system
- `@media-sdk/react` - React provider and hooks
- `@media-sdk/native` - React Native wrapper
- `@media-sdk/ui-react` - Reusable React UI components
- `@media-sdk/ui-native` - Reusable React Native UI components

## Core SDK

The SDK supports:

- Media search
- Curated media
- Single media retrieval
- Pagination
- API authentication
- Loading and error handling
- In-memory caching
- View and download activity events

## React SDK

Use the React provider to configure the SDK:

```tsx
<MediaProvider apiKey={apiKey}>
  <App />
</MediaProvider>
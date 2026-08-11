# Media SDK Data Wiring Skill

## Purpose

Use this skill when building a React web application that consumes
`@media-sdk/react` for media data, authentication, loading/error states,
pagination, and activity events.

The application layer is responsible for wiring the SDK to UI components.
Do not put Pexels/API-specific logic inside UI components.

## Architecture

Follow this dependency direction:

app → @media-sdk/react → @media-sdk/core

The application may also consume:

app → @media-sdk/ui-react

Keep data concerns separate from presentation concerns.

## Provider Setup

Initialize the media SDK through the React provider before using SDK hooks.

The provider should receive the required API configuration and make the
SDK available to descendant components.

Do not create separate SDK instances unnecessarily inside individual
components.

## Authentication

The Pexels API key must be supplied through application configuration.

Prefer environment variables for the web application.

Do not hard-code API keys inside React components or commit secrets to
the repository.

Example:

VITE_PEXELS_API_KEY=your_key_here

Use the environment variable when configuring the provider.

## Data Hooks

Use the hooks exposed by `@media-sdk/react` for data operations.

Typical responsibilities include:

- searching media
- loading curated media
- fetching a single media item
- handling pagination
- exposing loading state
- exposing error state

Keep API calls inside the SDK/wrapper layer rather than calling Pexels
directly from UI components.

## Search Flow

For a search UI:

1. Read the user's search query.
2. Pass the query to the media search hook.
3. Render the returned media items.
4. Show loading state while the request is pending.
5. Show an error state when the request fails.
6. Use pagination/load-more when additional results are available.

Avoid duplicating API request logic in the component.

## Loading and Error States

Every asynchronous media operation should have a clear UI state.

Handle:

- initial loading
- loading more results
- empty results
- API errors
- invalid requests

Do not silently ignore SDK errors.

Prefer the SDK's returned loading/error information instead of maintaining
duplicate request state unless the UI specifically needs additional state.

## Pagination

Use the SDK pagination contract.

When loading more results:

- preserve existing results
- request the next page
- append new results
- prevent duplicate requests while loading
- stop requesting when no additional results are available

The UI component should receive data and callbacks rather than knowing
how the Pexels API pagination works.

## Activity Events

The SDK supports activity events including:

- `view`
- `download`

The application may subscribe to these events when it needs to track
user activity.

Always clean up event subscriptions when the component unmounts.

Example pattern:

```ts
useEffect(() => {
  const unsubscribe = sdk.on("view", handler);

  return unsubscribe;
}, [sdk]);
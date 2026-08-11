# Media SDK UI Skill

## Purpose

Use this skill when building or modifying UI components for the Media SDK web application.

The UI layer is responsible for presentation, user interaction, accessibility, responsive layouts, and visual states.

Do not put Pexels/API-specific request logic inside UI components.

## Architecture

Follow this dependency direction:

app ? @media-sdk/ui-react
app ? @media-sdk/react ? @media-sdk/core

Keep presentation concerns separate from data and SDK concerns.

## Component Responsibilities

UI components should:

- Render media items
- Display images and metadata
- Handle user interactions
- Display loading states
- Display error states
- Display empty states
- Support pagination/load-more controls
- Remain reusable and composable

Avoid putting API request logic directly inside UI components.

## Media Grid

The media grid should:

- Display media items in a responsive layout
- Use reusable media-card components
- Handle different screen sizes
- Preserve a consistent visual hierarchy
- Provide accessible interactive elements

## Media Card

A media card should:

- Display the media image
- Display relevant media information
- Provide appropriate alternative text
- Support view interactions
- Support download interactions when available
- Avoid unnecessary re-renders

## Search UI

The search interface should:

- Provide a clear search input
- Allow users to submit a search
- Display the current search state
- Show loading feedback
- Show empty results feedback
- Show API errors clearly
- Provide a way to load additional results

## Loading State

Use an explicit loading UI.

Examples include:

- Skeleton cards
- Loading indicators
- Disabled load-more controls

Avoid blank screens while asynchronous operations are running.

## Error State

Errors should be visible and understandable.

Provide:

- Clear error messaging
- Retry functionality when appropriate
- A useful fallback state

Do not silently swallow errors.

## Empty State

When no media results are available:

- Clearly communicate that no results were found
- Avoid showing an empty grid
- Provide useful next actions when appropriate

## Accessibility

UI components should follow basic accessibility practices:

- Use semantic HTML
- Provide accessible labels
- Provide meaningful image alt text
- Ensure interactive elements are keyboard accessible
- Maintain visible focus states
- Do not rely only on color to communicate state

## Responsive Design

The application should work across:

- Desktop
- Tablet
- Mobile

Use responsive layouts rather than fixed-width components.

## Performance

Avoid unnecessary rendering and expensive calculations.

Prefer:

- Reusable components
- React.memo where appropriate
- Lazy loading for images
- Stable callbacks where useful
- Efficient list rendering

Do not optimize prematurely when it reduces readability.

## Styling

Keep styling concerns inside the UI layer.

Do not duplicate styling logic across components when reusable styles or components can be shared.

## Activity Interactions

When a user views or downloads media, the UI should invoke the appropriate SDK/application callback rather than implementing tracking logic itself.

The UI should not know how activity events are stored or transmitted.

## Design Principle

Keep components focused:

- Data layer handles media data
- SDK handles API communication
- UI layer handles presentation and interaction
- Application layer wires everything together

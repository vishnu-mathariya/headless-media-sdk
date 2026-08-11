@"
# Headless Media SDK

A TypeScript-based headless media SDK ecosystem built around the Pexels API.

The project is organized as a pnpm monorepo with a framework-agnostic core SDK, React and React Native wrappers, independent headless UI component libraries, and a React web application that wires the SDK and UI components together.

## Project Overview

The goal of this project is to provide a reusable media SDK that separates:

- Media/API communication
- Platform-specific SDK integration
- Headless UI components
- Application-level composition

The architecture keeps the core SDK independent from React, React Native, and the DOM while allowing platform-specific wrappers and UI libraries to consume it.

## Architecture

```text
                         ┌─────────────────────┐
                         │      Web App        │
                         │       React         │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
          @media-sdk/react                  @media-sdk/ui-react
                   │                                 │
                   ▼                                 │
           @media-sdk/core                           │
                   │                                 │
                   ▼                                 │
              Pexels API                             │

React Native:
    @media-sdk/native
           │
           ▼
    @media-sdk/core

UI packages remain independent from the SDK/data layer.
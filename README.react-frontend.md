
# Project Structure (Recommended)

Organize your React + Redux frontend as follows:

- `src/`
  - `components/` — Reusable React components (e.g., `DoctorList.tsx`, `DoctorSlots.tsx`)
  - `store/` — Redux store setup, slices, and RTK Query API definitions
  - `types/` — TypeScript type definitions and interfaces
  - `api/` — API utility functions or services (if not using RTK Query)
  - `App.tsx` — Main application entry point
  - `index.tsx` — ReactDOM render and provider setup

Keep tests alongside components or in a separate `__tests__/` folder. Use clear, descriptive names for files and folders to improve maintainability.

# PHP vs React + Redux (TypeScript)

## Key Differences
| Aspect                | PHP (Current)                                   | React + Redux (TypeScript)                |
|-----------------------|-------------------------------------------------|-------------------------------------------|
| Rendering             | Server-side, static HTML                        | Client-side, dynamic, real-time UI        |
| State Management      | None (stateless, or manual session handling)    | Centralized, predictable with Redux       |
| Interactivity         | Limited, requires page reloads                  | Highly interactive, SPA experience        |
| Component Reusability | Low (template-based)                            | High (component-based architecture)       |
| Developer Experience  | Slower feedback, less tooling                   | Hot reload, DevTools, strong ecosystem    |
| Type Safety           | PHP types, runtime errors                       | TypeScript, compile-time safety           |
| Testing               | PHPUnit, integration-heavy                      | Jest, RTL, easy unit/component testing    |
| Ecosystem             | Composer, older packages                        | npm, largest JS ecosystem                 |

## Why I choose react to complete this task
- **Real-Time UI**: React enables instant updates to the UI as data changes, without reloading the page. This is ideal for displaying doctor slots and availability.
- **Predictable State**: Redux provides a single source of truth for application state, making it easier to manage, debug, and extend.
- **Component-Based**: React’s modular components make the UI easier to maintain, test, and reuse.
- **Type Safety**: TypeScript catches errors at compile time, reducing bugs and improving code quality.
- **Developer Productivity**: Hot reloading, powerful dev tools, and a rich ecosystem speed up development and debugging.
- **Separation of Concerns**: React cleanly separates UI from backend logic, leading to a more maintainable codebase.
- **Testing**: React Testing Library and Jest make it easy to write fast, reliable unit and integration tests for UI and logic.

## Summary
Refactoring the frontend using React, Redux, and TypeScript will result in a more interactive, maintainable, and scalable application. It leverages modern web development best practices and provides a superior developer and user experience compared to a PHP-based frontend.

# How to Run the Project

## Prerequisites
- Node.js 22+
- Docker & Docker Compose (for containerized deployment)

## Development Mode

1. Start the API server:
```bash
docker-compose up unit-testing-api -d
```

2. Install dependencies and run the frontend:
```bash
cd app
npm install
npm run dev
```

3. Open http://localhost:5173 in your browser

## Production Mode (Docker)

Run both the API and frontend in containers:
```bash
docker-compose up -d
```

- Frontend: http://localhost:3000
- API: http://localhost:2137

## Running Tests

```bash
cd app
npm test
```

## Build for Production

```bash
cd app
npm run build
```

The built files will be in `app/dist/`.

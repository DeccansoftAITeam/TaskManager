---
name: 'React Standards'
description: 'Coding conventions for React files'
applyTo: '**/*.jsx, **/*.js, **/*.tsx'
---

## React Frontend Standards

- Build small, composable components with single responsibility.
- Keep components presentational where possible; move side effects to hooks/services.
- Prefer functional components and hooks; avoid class components unless required.
- Use clear naming and stable prop contracts.

## State & Data Flow
- Keep state local by default; lift only when multiple consumers need it.
- Centralize API calls in service modules; avoid fetch logic scattered in UI.
- Handle loading, empty, error, and success states explicitly.
- Avoid prop drilling by using context selectively for shared cross-cutting state.

## UX, Accessibility, and Security
- Preserve accessibility: semantic HTML, labels, keyboard support, focus visibility.
- Validate and sanitize user input on client before submission.
- Never store secrets in frontend code or local storage.
- Keep UI behavior predictable; avoid hidden side effects.

## Performance
- Memoize only when profiling indicates benefit.
- Prevent unnecessary re-renders via stable keys and dependency arrays.
- Lazy-load heavy routes/components when appropriate.
- Debounce/throttle expensive user-triggered operations.

## Error Handling & Observability
- Normalize API errors and surface user-friendly messages.
- Add contextual logging/telemetry hooks without leaking sensitive data.
- Keep retry behavior explicit for transient failures.

## Testing & Maintainability
- Add tests for critical user flows and component behavior.
- Prefer testing behavior over implementation details.
- Remove dead code, unused props, and stale state.
- Keep file structure and naming consistent with existing project patterns.

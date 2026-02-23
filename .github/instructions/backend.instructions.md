---
name: 'Python Standards'
description: 'Coding conventions for Python files'
applyTo: '**/*.py'
---

## Python Backend Standards

- Follow PEP 8, use type hints for public functions, and keep functions focused.
- Keep layers strict: router -> service -> repository; no DB access from routers.
- Use Pydantic/DTO schemas for input/output validation.
- Prefer explicit dependency injection over global mutable state.

## API & Business Logic
- Put domain rules in services; keep routers thin and deterministic.
- Use consistent HTTP status codes and response shapes.
- Validate identifiers, pagination inputs, and file metadata.
- Ensure idempotency for safe retries on create/update operations where feasible.

## Database
- Use transactions for multi-step writes.
- Prevent N+1 access patterns; fetch related data efficiently.
- Add indexes for frequent filters/lookups and enforce constraints at DB level.
- Keep repository methods explicit and testable.

## Errors, Security, Observability
- Raise domain-specific exceptions and map centrally to API errors.
- Do not expose stack traces or internal SQL details in responses.
- Never hardcode secrets; load from env/config.
- Log structured events with correlation/request IDs; exclude sensitive data.

## Testing
- Add unit tests for services and integration tests for repository/router paths.
- Mock external services; avoid flaky time/network coupling.
- Cover success, validation failure, auth failure, and edge cases.

## Maintainability
- Avoid premature abstraction and deep inheritance.
- Reuse existing utilities/constants before creating new ones.
- Keep modules cohesive; split files only when complexity justifies it.

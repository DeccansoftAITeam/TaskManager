---
name: 'Security Updates'
description: 'Implement security best practices and input validation'
model: Claude Opus 4.6
tools: [read, edit, agent]
---

Implement security best practices and input validation:

BACKEND:
- Create Pydantic models for all request/response validation in app/schemas
- Add field validators (min/max length, regex patterns, type checking)
- Replace all raw SQL with parameterized queries or SQLAlchemy ORM
- Implement SQL injection prevention
- Add input sanitization for all user inputs
- Configure CORS properly (specific origins, not *)
- Add rate limiting using slowapi
- Implement request size limits
- Add security headers (helmet equivalent for FastAPI)
- Hash any sensitive data before storing
- Add HTTPS enforcement in production settings

FRONTEND:
- Validate all form inputs before submission
- Follow Key Accessibility Guidelines (WCAG 2.1/2.2)
- Sanitize user inputs to prevent XSS attacks
- Use dangerouslySetInnerHTML only when absolutely necessary with sanitization
- Implement CSP (Content Security Policy) headers
- Never store sensitive data in localStorage (use secure httpOnly cookies if needed)
- Add CSRF protection for state-changing operations
- Validate data types from API responses
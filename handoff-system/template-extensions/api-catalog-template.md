# API Catalog Section Template

## Purpose
Maintain a comprehensive list of API endpoints with their implementation status, requirements, and performance characteristics.

## Usage
Add this section to your handoff documents when working on APIs, particularly for backend services and microservices.

## Template

```markdown
## API Endpoints Catalog

| Endpoint                | Method | Status       | Auth Required | Response Time | Notes |
|-------------------------|--------|--------------|---------------|---------------|-------|
| `/api/[resource]`       | [HTTP] | [status]     | [Yes/No]      | ~[time]ms     | [special considerations] |
```

## Status Options
- **Implemented**: Fully functional and tested
- **In Progress**: Code exists but incomplete
- **Planned**: Defined but not implemented
- **Deprecated**: Marked for removal

## Example

```markdown
## API Endpoints Catalog

| Endpoint                | Method | Status       | Auth Required | Response Time | Notes |
|-------------------------|--------|--------------|---------------|---------------|-------|
| `/api/users`            | GET    | Implemented  | Yes           | ~120ms        | Paginates with ?page & ?limit |
| `/api/auth/login`       | POST   | Implemented  | No            | ~150ms        | Returns JWT token |
| `/api/weather/import`   | POST   | In Progress  | Yes           | -             | Needs rate limiting |
| `/api/legacy/reports`   | GET    | Deprecated   | Yes           | ~300ms        | Use `/api/reports` instead |
```

## Tips
- Update this catalog in each handoff that modifies API endpoints
- Add links to detailed API documentation if available
- Note performance characteristics for identifying optimization opportunities

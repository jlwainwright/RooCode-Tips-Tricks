# Testing Status Template

## Purpose
Track the testing coverage and quality across different components to ensure robust testing practices and identify areas needing attention.

## Usage
Add this section to handoff documents to communicate test coverage and quality for new or modified components.

## Template

```markdown
## Testing Status

| Component         | Unit Tests | Integration Tests | E2E Tests | Notes |
|-------------------|------------|-------------------|-----------|-------|
| [Component Name]  | [count] passing | [count] passing | [status] | [specific test notes] |
```

## Status Options
- **Unit/Integration/E2E Tests**: Number of tests (passing/total)
- **Not Implemented**: Tests don't exist yet
- **N/A**: This type of test doesn't apply to this component

## Example

```markdown
## Testing Status

| Component         | Unit Tests | Integration Tests | E2E Tests | Notes |
|-------------------|------------|-------------------|-----------|-------|
| Auth Service      | 24/24 passing | 6/6 passing | 2/2 passing | Complete test coverage |
| User API          | 16/18 passing | 4/4 passing | Not implemented | Two edge cases still failing |
| Email Service     | 8/8 passing | N/A | 1/1 passing | Service is mostly external |
| Weather Import    | 12/15 passing | 2/3 passing | Not implemented | Rate limiting tests failing |
| Dashboard UI      | 30/30 passing | 5/5 passing | 8/10 passing | Mobile view tests failing |
```

## Tips
- Update this section after adding or modifying tests
- Include test coverage percentages when available
- Note any flaky tests that need attention
- Document test improvements made during the current work session
- Link to test results in your CI/CD system if applicable

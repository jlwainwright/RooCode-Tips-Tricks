# Code Health Section Template

## Purpose
Track code quality and technical health metrics across handoffs to identify trends and areas needing attention.

## Usage
Add this section to your handoff documents after the "Work in Progress" section.

## Template

```markdown
## Code Health Metrics
- **Test Coverage**: [percentage]% ([paths covered]/[total paths])
- **Linting Status**: [pass/partial/fail] ([issues count] issues)
- **Documentation**: [percentage]% of public APIs documented
- **Technical Debt**: [count] TODOs/FIXMEs in codebase
- **Performance**: Key operation [name] completes in [time] ms
```

## Example

```markdown
## Code Health Metrics
- **Test Coverage**: 78% (156/200 paths)
- **Linting Status**: Partial (12 issues)
- **Documentation**: 85% of public APIs documented
- **Technical Debt**: 8 TODOs/FIXMEs in codebase
- **Performance**: Database query completes in 120 ms
```

## Tips
- Use tools like Jest coverage reports, ESLint, or SonarQube to get accurate metrics
- Track these metrics over time to identify improvements or regressions
- Document specific patterns that improve code health

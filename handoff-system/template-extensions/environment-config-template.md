# Environment Configuration Template

## Purpose
Document changes to environment configuration to ensure all team members have the correct setup and to troubleshoot environment-specific issues.

## Usage
Add this section to handoff documents when modifying environment variables, configuration files, or required services.

## Template

```markdown
## Environment Configuration
- **New Variables**: 
  - `[VARIABLE_NAME]`: [purpose] (default: [value])
  
- **Changed Variables**:
  - `[VARIABLE_NAME]`: [old value] → [new value] - [reason]
  
- **Required Services**: 
  - [service name] ([version]) - [purpose]
  
- **Configuration Files**:
  - `[filename]`: [changes made]
```

## Example

```markdown
## Environment Configuration
- **New Variables**: 
  - `WEATHER_API_KEY`: External weather service authentication (default: none)
  - `CACHE_TTL_SECONDS`: How long data stays in cache (default: 3600)
  
- **Changed Variables**:
  - `DB_CONNECTION_POOL`: 5 → 10 - Increased for better handling of concurrent requests
  - `LOG_LEVEL`: "info" → "debug" - Temporarily for troubleshooting performance issues
  
- **Required Services**: 
  - Redis (v7.0+) - Required for new caching layer
  - PostgreSQL (v15+) - Using new JSON features
  
- **Configuration Files**:
  - `.env.example`: Updated with new required variables
  - `docker-compose.yml`: Added Redis service
```

## Tips
- Include instructions for obtaining API keys or credentials when applicable
- Document both development and production environment changes
- Specify version requirements for dependent services
- Note any required infrastructure changes

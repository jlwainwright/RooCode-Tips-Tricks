# Dependency Changelog Template

## Purpose
Track changes to project dependencies for better version control and troubleshooting of dependency-related issues.

## Usage
Add this section to handoff documents when modifying project dependencies, including packages, libraries, or external services.

## Template

```markdown
## Dependency Updates
- **Added**: 
  - `[package name]@[version]` - [reason for addition]
  
- **Upgraded**: 
  - `[package name]` [old version] → [new version] - [reason for upgrade]
  
- **Removed**: 
  - `[package name]` - [reason for removal]
  
- **Security**: 
  - Updated `[package name]` to patch [CVE ID or security issue]
```

## Example

```markdown
## Dependency Updates
- **Added**: 
  - `@mui/x-data-grid@6.5.0` - For performance-optimized data tables
  - `date-fns@2.30.0` - Consistent date formatting and calculations
  
- **Upgraded**: 
  - `axios` 1.3.4 → 1.6.2 - Improved error handling and HTTP/2 support
  - `react` 18.2.0 → 18.3.0 - Access to new hooks and performance improvements
  
- **Removed**: 
  - `moment` - Replaced with smaller date-fns library
  - `custom-table-component` - Replaced with MUI data grid
  
- **Security**: 
  - Updated `vite` to patch CVE-2023-34092 (path traversal vulnerability)
  - Updated `express` for prototype pollution fix
```

## Tips
- Document both direct and transitive dependency changes
- Note breaking changes that required code modifications
- Include the package manager command used (e.g., `npm install`, `yarn add`)
- Link to release notes for significant dependency updates

# Database Schema Tracking Template

## Purpose
Document changes to database schemas to maintain a clear history of data model evolution.

## Usage
Add this section to handoff documents when making changes to database structures, whether SQL, NoSQL, or other data stores.

## Template

```markdown
## Database Schema Updates

### [Database Name] Changes
- **New Tables/Collections**: 
  - `[name]`: [purpose]
  
- **Modified Tables/Collections**: 
  - `[name]`: Added `[column/field]` ([type]) - [purpose]
  - `[name]`: Modified `[column/field]` from [old type] to [new type]
  - `[name]`: Removed `[column/field]` - [reason]
  
- **Indexes**:
  - Added index on `[table/collection].[column/field]`
  - Removed index on `[table/collection].[column/field]`
  
- **Migrations**: 
  - Migration script `[filename]` handles data conversion
  - Run using: `[command]`
```

## Example

```markdown
## Database Schema Updates

### PostgreSQL Changes
- **New Tables**: 
  - `weather_data`: Stores imported weather information
  
- **Modified Tables**: 
  - `users`: Added `last_login_at` (TIMESTAMP) - Track user engagement
  - `measurements`: Modified `value` from FLOAT to DECIMAL(10,2) - Increased precision
  - `legacy_stats`: Removed `daily_average` - Now calculated on-demand
  
- **Indexes**:
  - Added index on `weather_data.location_id`
  - Added composite index on `measurements(device_id, timestamp)`
  
- **Migrations**: 
  - Migration script `20250413_precise_measurements.sql` converts existing data
  - Run using: `psql -f migrations/20250413_precise_measurements.sql`

### MongoDB Changes
- **Modified Collections**:
  - `devices`: Added new field `firmware_version` (String) to track device status
  - `readings`: Added index on `{ timestamp: -1, device_id: 1 }`
```

## Tips
- Include enough detail for new developers to understand the current schema
- Document specific migration steps when data conversion is needed
- Note any performance implications of schema changes

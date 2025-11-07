# Station Map Locations

This folder contains the map location data for the Station Map tab.

## Structure

- `types.ts` - TypeScript interfaces for map locations
- `location-*.ts` - Individual location files with detailed information
- `index.ts` - Central export point for all locations

## Adding New Locations

To add a new location:

1. Create a new file: `location-XXX.ts` (e.g., `location-007.ts`)
2. Follow this template:

```typescript
import { MapLocation } from './types';

export const locationXXX: MapLocation = {
    id: XXX,
    name: 'LOCATION NAME',
    description: 'Brief description',
    status: 'operational', // operational | maintenance | offline | restricted
    coordinates: 'DECK X - SECTION XX',
    details: `Full location details here...`,
};
```

3. Add the import and export to `index.ts`
4. Add it to the `allLocations` array

## Location Status Types

- **operational** - Fully functional (green indicator)
- **maintenance** - Under maintenance (yellow indicator)
- **offline** - Not operational (red indicator)
- **restricted** - Restricted access (purple indicator)

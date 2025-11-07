export interface MapLocation {
    id: number;
    name: string;
    description: string;
    status: 'operational' | 'maintenance' | 'offline' | 'restricted';
    details: string;
}

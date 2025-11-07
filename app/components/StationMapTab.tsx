import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { allLocations, MapLocation } from '../map';

export default function StationMapTab() {
    const [selectedLocationId, setSelectedLocationId] = useState<number>(1);
    const [locations] = useState<MapLocation[]>(allLocations);

    const selectedLocation = locations.find(l => l.id === selectedLocationId);

    const handleLocationSelect = useCallback((id: number) => {
        setSelectedLocationId(id);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'j') {
                e.preventDefault();
                // Move down (next location)
                const currentIndex = locations.findIndex(l => l.id === selectedLocationId);
                if (currentIndex < locations.length - 1) {
                    handleLocationSelect(locations[currentIndex + 1].id);
                }
            } else if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                // Move up (previous location)
                const currentIndex = locations.findIndex(l => l.id === selectedLocationId);
                if (currentIndex > 0) {
                    handleLocationSelect(locations[currentIndex - 1].id);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedLocationId, locations, handleLocationSelect]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational':
                return 'text-green-400';
            case 'maintenance':
                return 'text-yellow-400';
            case 'offline':
                return 'text-red-400';
            case 'restricted':
                return 'text-purple-400';
            default:
                return 'text-pink-400';
        }
    };

    const getStatusSymbol = (status: string) => {
        switch (status) {
            case 'operational':
                return '●';
            case 'maintenance':
                return '◐';
            case 'offline':
                return '○';
            case 'restricted':
                return '⚠';
            default:
                return '?';
        }
    };

    return (
        <div className="flex flex-1 min-h-0">
            {/* Desktop: Side-by-side layout */}
            {/* Mobile: Continuous scroll of all locations */}

            {/* Desktop - Left Column - Locations List */}
            <div className="hidden md:flex w-1/3 border-r-2 border-pink-700 flex-col">
                <div className="p-3 border-b border-pink-700 text-pink-400 font-bold text-sm" style={{ textShadow: '0 0 5px currentColor' }}>
                    STATION LOCATIONS [{locations.length}]
                </div>
                <div className="flex-1 overflow-y-auto terminal-scroll">
                    {locations.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => handleLocationSelect(location.id)}
                            className={`w-full text-left p-2.5 border-b border-pink-800 transition-colors ${selectedLocationId === location.id
                                ? 'bg-pink-900 bg-opacity-40'
                                : 'hover:bg-pink-950 hover:bg-opacity-20'
                                }`}
                        >
                            <div className="flex items-start gap-2 mb-1">
                                <span className={`text-lg ${getStatusColor(location.status)}`} style={{ textShadow: '0 0 5px currentColor' }}>
                                    {getStatusSymbol(location.status)}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-bold truncate text-pink-300`} style={{ textShadow: '0 0 3px currentColor' }}>
                                        {location.name}
                                    </div>
                                    <div className="text-xs text-pink-700 truncate mt-1">
                                        {location.description}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop - Right Column - Selected Location Details */}
            <div className="hidden md:flex flex-1 flex-col p-4">
                {selectedLocation ? (
                    <>
                        {/* Location Header */}
                        <div className="mb-4 pb-3 border-b border-pink-700">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-xl ${getStatusColor(selectedLocation.status)}`} style={{ textShadow: '0 0 5px currentColor' }}>
                                        {getStatusSymbol(selectedLocation.status)}
                                    </span>
                                    <h2 className="text-lg text-pink-300 font-bold" style={{ textShadow: '0 0 5px currentColor' }}>
                                        {selectedLocation.name}
                                    </h2>
                                </div>
                            </div>
                            <div className="text-sm text-pink-400">
                                STATUS: <span className={`uppercase font-bold ${getStatusColor(selectedLocation.status)}`}>
                                    {selectedLocation.status}
                                </span>
                            </div>
                        </div>

                        {/* Map Image */}
                        <div className="mb-4 border border-pink-700 rounded-sm overflow-hidden bg-black bg-opacity-50 flex items-center justify-center" style={{ height: '400px' }}>
                            <Image
                                src="/TheDream.png"
                                alt="Station Map"
                                width={800}
                                height={400}
                                className="object-contain w-full h-full"
                                style={{ filter: 'hue-rotate(300deg) saturate(1.2)' }}
                            />
                        </div>

                        {/* Location Details */}
                        <div className="flex-1 overflow-y-auto terminal-scroll pr-3">
                            <div className="text-pink-400 whitespace-pre-wrap text-sm" style={{ textShadow: '0 0 3px currentColor' }}>
                                {selectedLocation.details}
                            </div>
                        </div>

                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-pink-600">
                        NO LOCATION SELECTED
                    </div>
                )}
            </div>

            {/* Mobile - Continuous Scroll View */}
            <div className="flex md:hidden flex-1 flex-col overflow-y-auto terminal-scroll">
                {/* Header */}
                <div className="p-2 border-b border-pink-700 text-pink-400 font-bold text-xs sticky top-0 bg-black bg-opacity-90 z-10" style={{ textShadow: '0 0 5px currentColor' }}>
                    STATION LOCATIONS [{locations.length}]
                </div>

                {/* Map Image - Single instance at top */}
                <div className="p-3">
                    <div className="border border-pink-700 rounded-sm overflow-hidden bg-black bg-opacity-50" style={{ height: '300px' }}>
                        <Image
                            src="/TheDream.png"
                            alt="Prospero's Dream Station Map"
                            width={800}
                            height={400}
                            className="object-contain w-full h-full"
                            style={{ filter: 'hue-rotate(300deg) saturate(1.2)' }}
                            priority
                        />
                    </div>
                </div>

                {/* All Locations */}
                {locations.map((location) => (
                    <div key={location.id} className="border-b-2 border-pink-800 p-3">
                        {/* Location Header */}
                        <div className="mb-2 pb-2 border-b border-pink-700">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-base ${getStatusColor(location.status)}`} style={{ textShadow: '0 0 5px currentColor' }}>
                                    {getStatusSymbol(location.status)}
                                </span>
                                <h2 className="text-sm font-bold text-pink-300" style={{ textShadow: '0 0 5px currentColor' }}>
                                    {location.name}
                                </h2>
                            </div>
                            <div className="text-xs text-pink-400">
                                STATUS: <span className={`uppercase font-bold ${getStatusColor(location.status)}`}>
                                    {location.status}
                                </span>
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="text-xs text-pink-400 whitespace-pre-wrap break-words overflow-hidden" style={{ textShadow: '0 0 3px currentColor', wordBreak: 'break-word' }}>
                            {location.details}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

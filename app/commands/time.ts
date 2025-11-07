import { Command } from './types';

export const timeCommand: Command = {
    name: 'time',
    description: 'Display current station chronometry',
    execute: () => {
        const now = new Date();
        return `> PROSPERO_SYS CHRONOMETRIC FEED
───────────────────────────────────────
LOCAL STATION CYCLE: ${now.toLocaleTimeString()}  
EARTH REFERENCE DATE: þ≈µ¿∴¥Ðæ∂Ω⌐≡ζξΛπ 
DREAM ROTATION INDEX: 247  
SLEEP PHASE: N/A  
SHIFT CHANGE: CONTINUOUS  

Note: Prospero’s Dream operates on a 27-hour cycle that never officially resets.  
For your comfort, artificial dawn will occur when the lights remember how.
───────────────────────────────────────
"Time is a construct. Oxygen is a resource."
`;
    },
};


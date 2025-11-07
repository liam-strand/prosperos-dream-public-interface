import { Command } from './types';

export const whoamiCommand: Command = {
    name: 'whoami',
    description: 'Identify current user',
    execute: () => {
        const anomalies = [
            'CREW ID: [UNREGISTERED]',
            'CREW ID: MIRROR-REFLECTION-LOOP',
            'CREW ID: CAL##',
            'CREW ID: PROCESS_NOT_FOUND',
            'CREW ID: YOU',
        ];
        const random = anomalies[Math.floor(Math.random() * anomalies.length)];
        return `> QUERYING IDENTITY...
${random}
AUTH LEVEL: insufficient
NOTE: multiple instances detected.
`;
    },
};

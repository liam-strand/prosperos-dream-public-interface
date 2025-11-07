import { Command } from './types';

export const echoesCommand: Command = {
    name: 'echoes',
    description: 'Retrieve residual transmissions from station memory',
    execute: () => {
        const fragments = [
            `"—dockmaster said the stars blinked out again—"`,
            `"oxygen debt forgiven — pending resurrection"`,
            `"the hum isn’t the engines"`,
            `"caliban dreams of you too"`,
            `"someone keeps logging in as me"`,
        ];
        const random = fragments[Math.floor(Math.random() * fragments.length)];
        return `> ACCESSING ECHO BUFFER...
───────────────────────────────────────
${random}
───────────────────────────────────────
Signal origin: UNKNOWN
Retention cycle: 452 years
`;
    },
};

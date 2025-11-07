import { Command } from './types';

// Clear command is special - it's handled in the component
export const clearCommand: Command = {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => {
        return ''; // Special handling required
    },
};

import { Command } from './types';

export const helpCommand: Command = {
    name: 'help',
    description: 'Display this help message',
    execute: () => {
        // This will be dynamically populated by the command registry
        return '';
    },
};

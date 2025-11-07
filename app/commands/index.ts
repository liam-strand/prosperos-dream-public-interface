import { Command } from './types';
import { helpCommand } from './help';
import { echoesCommand } from './echoes';
import { scanCommand } from './scan';
import { timeCommand } from './time';
import { logsCommand } from './logs';
import { clearCommand } from './clear';
import { whoamiCommand } from './whoami';
import { probeCommand } from './probe';
import { authCommand } from './auth';

// Registry of all available commands
export const commandRegistry: Record<string, Command> = {
    [helpCommand.name]: helpCommand,
    [echoesCommand.name]: echoesCommand,
    [scanCommand.name]: scanCommand,
    [timeCommand.name]: timeCommand,
    [logsCommand.name]: logsCommand,
    [clearCommand.name]: clearCommand,
    [whoamiCommand.name]: whoamiCommand,
    [probeCommand.name]: probeCommand,
    [authCommand.name]: authCommand,
};

// Helper to get all commands for help text generation
export const getAllCommands = (): Command[] => {
    return Object.values(commandRegistry);
};

// Generate help text dynamically from registered commands
export const generateHelpText = (): string => {
    const commands = getAllCommands();
    const maxNameLength = Math.max(...commands.map(cmd => cmd.name.length));

    const commandLines = commands.map(cmd => {
        const padding = ' '.repeat(maxNameLength - cmd.name.length + 5);
        return `  ${cmd.name}${padding}- ${cmd.description}`;
    }).join('\n');

    return `AVAILABLE COMMANDS:\n${commandLines}`;
};

// Helper to execute a command by name
export const executeCommand = (commandName: string, args: string[] = []): string | null => {
    const command = commandRegistry[commandName.toLowerCase()];
    if (!command) {
        return null;
    }

    // Special handling for help command
    if (commandName.toLowerCase() === 'help') {
        return generateHelpText();
    }

    return command.execute(args);
};

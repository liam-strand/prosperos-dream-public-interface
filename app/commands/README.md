# Commands Directory

This directory contains modular command implementations for the terminal emulator.

## Structure

Each command is defined in its own TypeScript file and follows the `Command` interface:

```typescript
interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string;
}
```

## Adding a New Command

1. **Create a new file** in the `commands/` directory (e.g., `mycommand.ts`)

2. **Define your command**:
```typescript
import { Command } from './types';

export const myCommand: Command = {
  name: 'mycommand',
  description: 'Description of what your command does',
  execute: (args: string[]) => {
    // Your command logic here
    return 'Command output';
  },
};
```

3. **Register the command** in `commands/index.ts`:
```typescript
import { myCommand } from './mycommand';

export const commandRegistry: Record<string, Command> = {
  // ... existing commands
  [myCommand.name]: myCommand,
};
```

4. **That's it!** Your command will automatically:
   - Be available in the terminal
   - Appear in the `help` command output
   - Support argument parsing

## Example Commands

- **help.ts** - Displays all available commands (dynamically generated)
- **status.ts** - Shows system status information
- **scan.ts** - Performs an environmental scan
- **time.ts** - Displays current time and mission day
- **logs.ts** - Shows system logs
- **clear.ts** - Clears the terminal (special handling required)

## Special Cases

### Clear Command
The `clear` command requires special handling in the main component as it needs to modify the history state directly. It's registered but handled separately in `page.tsx`.

### Commands with Arguments
Access arguments through the `args` parameter in the `execute` function:

```typescript
execute: (args: string[]) => {
  if (args.length === 0) {
    return 'Error: Missing argument';
  }
  return `Processing: ${args[0]}`;
}
```

## Tips

- Keep commands focused on a single task
- Return formatted strings that fit the terminal aesthetic
- Use the sci-fi/Mothership theme for response messages
- Test your command thoroughly before adding it

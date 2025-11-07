import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { executeCommand } from '../commands';

interface HistoryEntry {
    type: 'command' | 'output' | 'system';
    content: string;
    timestamp?: string;
}

export default function TerminalTab() {
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const [history, setHistory] = useState<HistoryEntry[]>([
        { type: 'system', content: '> PROSPERO\'S DREAM PUBLIC TERMINAL v2.5.1' },
        { type: 'system', content: '> ACCESS IS MONITORED' },
        { type: 'system', content: '> CONNECTION ESTABLISHED...' },
        { type: 'system', content: '\n' },
        { type: 'output', content: 'Type command or "help" for a list of commands.' },
        { type: 'output', content: '\n' }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isStreaming, setIsStreaming] = useState(false);

    useEffect(() => {
        // Auto-scroll to bottom when history updates
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        // Focus input when tab becomes active
        inputRef.current?.focus();
    }, []);

    const streamOutput = async (lines: string[]) => {
        setIsStreaming(true);
        for (const line of lines) {
            await new Promise(resolve => setTimeout(resolve, 50)); // Delay between lines
            setHistory(prev => [...prev, { type: 'output', content: line }]);
        }
        setHistory(prev => [...prev, { type: 'output', content: '' }]); // Add empty line at end
        setIsStreaming(false);

        // Refocus input after streaming completes
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Prevent multiple commands while streaming
        if (isStreaming) return;

        // Add command to history
        setHistory(prev => [...prev, { type: 'command', content: `> ${trimmedCmd}` }]);
        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        // Parse command and arguments
        const parts = trimmedCmd.split(' ');
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Special handling for clear command
        if (commandName === 'clear') {
            setHistory([]);
            setInput('');
            // Refocus input after clear
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
            return;
        }

        // Execute command through the command registry
        const response = executeCommand(commandName, args);

        if (response === null) {
            // Command not found
            const errorMsg = `ERROR: Unknown command '${commandName}'. Type 'help' for available commands.`;
            setHistory(prev => [...prev, { type: 'output', content: errorMsg }, { type: 'output', content: '' }]);
            // Refocus input after error
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        } else {
            // Split response into lines and stream them
            const lines = response.split('\n');
            await streamOutput(lines);
        }

        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Tab switching is handled by global keyboard handler
        if (e.ctrlKey && (e.key === 'h' || e.key === 'l')) {
            // Let the global handler handle it
            return;
        }

        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div className="flex flex-1 min-h-0 flex-col p-2 sm:p-4" onClick={() => inputRef.current?.focus()}>
            <div
                ref={terminalRef}
                className="flex-1 min-h-0 overflow-y-auto pr-2 sm:pr-3 terminal-scroll mb-2"
            >
                {history.map((entry, index) => (
                    <div
                        key={index}
                        className={`mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base ${entry.type === 'system'
                            ? 'text-cyan-400'
                            : entry.type === 'command'
                                ? 'text-pink-400 font-bold'
                                : 'text-pink-500'
                            }`}
                        style={{ textShadow: '0 0 5px currentColor' }}
                    >
                        <pre className="whitespace-pre-wrap break-words font-mono">
                            {entry.content}
                        </pre>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center border-t border-pink-700 pt-1.5 sm:pt-2">
                <span
                    className="text-pink-400 mr-1.5 sm:mr-2 text-xs sm:text-sm md:text-base"
                    style={{ textShadow: '0 0 5px currentColor' }}
                >
                    {'>'}
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-pink-400 font-mono caret-pink-400 text-xs sm:text-sm md:text-base"
                    style={{ textShadow: '0 0 5px currentColor' }}
                    autoFocus
                    spellCheck={false}
                    disabled={isStreaming}
                />
            </div>
        </div>
    );
}

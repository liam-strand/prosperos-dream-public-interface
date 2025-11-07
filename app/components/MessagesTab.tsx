import { useState, useEffect, useCallback, useRef } from 'react';
import { allMessages, Message } from '../messages';

export default function MessagesTab() {
    const [selectedMessageId, setSelectedMessageId] = useState<number>(1);
    const [messages, setMessages] = useState<Message[]>(allMessages);
    const [showMessageDetail, setShowMessageDetail] = useState(false);
    const messageContentRef = useRef<HTMLDivElement>(null);

    const selectedMessage = messages.find(m => m.id === selectedMessageId);

    const handleMessageSelect = useCallback((id: number) => {
        setSelectedMessageId(id);
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, read: true } : msg
        ));
        setShowMessageDetail(true);

        // Scroll to top of message content
        setTimeout(() => {
            if (messageContentRef.current) {
                messageContentRef.current.scrollTop = 0;
            }
        }, 0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'j') {
                e.preventDefault();
                // Move down (next message)
                const currentIndex = messages.findIndex(m => m.id === selectedMessageId);
                if (currentIndex < messages.length - 1) {
                    const nextId = messages[currentIndex + 1].id;
                    setSelectedMessageId(nextId);
                    setMessages(prev => prev.map(msg =>
                        msg.id === nextId ? { ...msg, read: true } : msg
                    ));
                }
            } else if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                // Move up (previous message)
                const currentIndex = messages.findIndex(m => m.id === selectedMessageId);
                if (currentIndex > 0) {
                    const prevId = messages[currentIndex - 1].id;
                    setSelectedMessageId(prevId);
                    setMessages(prev => prev.map(msg =>
                        msg.id === prevId ? { ...msg, read: true } : msg
                    ));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMessageId, messages]);

    const getPrioritySymbol = (priority: string) => {
        if (priority === 'high') return '!!!';
        if (priority === 'low') return '---';
        return '>>>';
    };

    return (
        <div className="flex flex-1 min-h-0">
            {/* Message List - Hidden on mobile when detail is shown */}
            <div className={`w-full md:w-1/3 md:border-r-2 border-pink-700 flex flex-col ${showMessageDetail ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-2 sm:p-3 border-b border-pink-700 text-pink-400 font-bold text-xs sm:text-sm" style={{ textShadow: '0 0 5px currentColor' }}>
                    INBOX [{messages.filter(m => !m.read).length} UNREAD]
                </div>
                <div className="flex-1 overflow-y-auto terminal-scroll">
                    {messages.map((message) => (
                        <button
                            key={message.id}
                            onClick={() => handleMessageSelect(message.id)}
                            className={`w-full text-left p-2 sm:p-3 border-b border-pink-800 transition-colors ${selectedMessageId === message.id
                                ? 'bg-pink-900 bg-opacity-40'
                                : 'hover:bg-pink-950 hover:bg-opacity-20'
                                }`}
                        >
                            <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
                                <span className={`text-[10px] sm:text-xs ${message.priority === 'high' ? 'text-red-400' : 'text-pink-600'}`}>
                                    {getPrioritySymbol(message.priority)}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-xs sm:text-sm truncate ${!message.read ? 'text-pink-300 font-bold' : 'text-pink-500'}`} style={{ textShadow: '0 0 3px currentColor' }}>
                                        {message.from}
                                    </div>
                                    <div className={`text-[10px] sm:text-xs truncate ${!message.read ? 'text-pink-400' : 'text-pink-600'}`}>
                                        {message.subject}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-pink-700 truncate mt-0.5 sm:mt-1">
                                        {message.preview}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Content - Full width on mobile when shown */}
            <div className={`flex-1 flex flex-col p-2 sm:p-4 ${showMessageDetail ? 'flex' : 'hidden md:flex'}`}>
                {selectedMessage ? (
                    <>
                        {/* Back button - Only visible on mobile */}
                        <button
                            onClick={() => setShowMessageDetail(false)}
                            className="md:hidden mb-2 px-3 py-1.5 border border-pink-700 text-pink-400 text-xs hover:bg-pink-950 hover:bg-opacity-20 transition-colors self-start"
                            style={{ textShadow: '0 0 5px currentColor' }}
                        >
                            ← BACK TO INBOX
                        </button>

                        <div className="mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-pink-700">
                            <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className={`text-[10px] sm:text-xs ${selectedMessage.priority === 'high' ? 'text-red-400' : 'text-pink-600'}`}>
                                        {getPrioritySymbol(selectedMessage.priority)}
                                    </span>
                                    <h2 className="text-sm sm:text-base md:text-lg text-pink-300 font-bold" style={{ textShadow: '0 0 5px currentColor' }}>
                                        {selectedMessage.subject}
                                    </h2>
                                </div>
                            </div>
                            <div className="text-xs sm:text-sm text-pink-400 mb-1">
                                FROM: <span className="text-pink-300">{selectedMessage.from}</span>
                            </div>
                        </div>
                        <div ref={messageContentRef} className="flex-1 overflow-y-auto terminal-scroll pr-2 sm:pr-3">
                            <div className="text-xs sm:text-sm md:text-base text-pink-400 whitespace-pre-wrap break-words overflow-hidden pr-2" style={{ textShadow: '0 0 3px currentColor', wordBreak: 'break-word' }}>
                                {selectedMessage.content}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-pink-600 text-xs sm:text-sm">
                        NO MESSAGE SELECTED
                    </div>
                )}
            </div>
        </div>
    );
}

export interface Message {
    id: number;
    from: string;
    subject: string;
    preview: string;
    content: string;
    read: boolean;
    priority: 'high' | 'normal' | 'low';
}

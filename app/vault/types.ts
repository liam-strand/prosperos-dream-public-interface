export interface VaultFile {
    id: string;
    name: string;
    type: 'document' | 'image' | 'audio' | 'video' | 'data';
    classification: 'TOP SECRET' | 'CLASSIFIED' | 'CONFIDENTIAL' | 'RESTRICTED';
    content: string;
}

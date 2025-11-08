export interface Block {
    id: string;
    type: 'text' | 'image' | 'contact' | 'container';
    content: string;
    styles: {
        fontSize?: string;
        color?: string;
        backgroundColor?: string;
        padding?: string;
        margin?: string;
        display?: string;
        flexDirection?: string;
    };
    children: Block[];
    parentId?: string;
}

export interface SiteData {
    title: string;
    blocks: Block[];
}

export interface DragItem {
    type: 'block';
    id: string;
    originalParentId?: string;
    index: number;
}
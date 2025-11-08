import { useState, useRef } from 'react';
import { DragItem, Block } from '../types';

export function useDragDrop() {
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
    const [dragOverParent, setDragOverParent] = useState<string | null>(null);
    const dragImageRef = useRef<HTMLDivElement | null>(null);

    const createDragImage = (block: Block) => {
        if (dragImageRef.current) {
            document.body.removeChild(dragImageRef.current);
        }

        const dragImage = document.createElement('div');
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        dragImage.style.left = '-1000px';
        dragImage.style.background = 'rgba(0, 122, 204, 0.8)';
        dragImage.style.color = 'white';
        dragImage.style.padding = '8px 12px';
        dragImage.style.borderRadius = '4px';
        dragImage.style.fontSize = '12px';
        dragImage.style.zIndex = '10000';
        dragImage.innerText = `${block.type} - ${block.id.slice(0, 6)}`;

        document.body.appendChild(dragImage);
        dragImageRef.current = dragImage;

        return dragImage;
    };

    const handleDragStart = (e: React.DragEvent, block: Block, index: number) => {
        const dragImage = createDragImage(block);
        e.dataTransfer.setDragImage(dragImage, -10, -10);
        e.dataTransfer.effectAllowed = 'move';

        setDraggedItem({
            type: 'block',
            id: block.id,
            originalParentId: block.parentId,
            index
        });
    };

    const handleDragOver = (e: React.DragEvent, parentId?: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverParent(parentId || null);
    };

    const handleDragLeave = () => {
        setDragOverParent(null);
    };

    const handleDrop = (e: React.DragEvent, targetParentId?: string, targetIndex?: number) => {
        e.preventDefault();
        setDragOverParent(null);

        if (!draggedItem) return;

        return {
            draggedItem,
            targetParentId: targetParentId || null,
            targetIndex: targetIndex !== undefined ? targetIndex : -1
        };
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDragOverParent(null);

        if (dragImageRef.current) {
            document.body.removeChild(dragImageRef.current);
            dragImageRef.current = null;
        }
    };

    return {
        draggedItem,
        dragOverParent,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd
    };
}
import { Block } from '../../types';

interface ImageBlockProps {
    block: Block;
    onClick: () => void;
    isSelected: boolean;
    onDragStart: (e: React.DragEvent, block: Block, index: number) => void;
    onDragOver: (e: React.DragEvent, parentId?: string) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, parentId?: string, index?: number) => void;
    onDragEnd: () => void;
    dragOverParent: string | null;
    draggedItem: any;
    index?: number;
}

export function ImageBlock({
                               block,
                               onClick,
                               isSelected,
                               onDragStart,
                               onDragOver,
                               onDragLeave,
                               onDrop,
                               onDragEnd,
                               draggedItem,
                               index = 0
                           }: ImageBlockProps) {
    const isBeingDragged = draggedItem?.id === block.id;

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, block, index)}
            onDragOver={(e) => onDragOver(e, block.parentId)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, block.parentId, index)}
            onDragEnd={onDragEnd}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            style={{
                backgroundColor: block.styles.backgroundColor,
                padding: block.styles.padding,
                margin: block.styles.margin
            }}
            className={`
        block image-block 
        ${isSelected ? 'selected' : ''} 
        ${isBeingDragged ? 'dragging' : ''}
        draggable
      `}
        >
            <img src={block.content} alt="Uploaded" />
        </div>
    );
}
import { Block } from '../../types';
import { TextBlock } from '../Blocks/TextBlock';
import { ImageBlock } from '../Blocks/ImageBlock';
import { ContactBlock } from '../Blocks/ContactBlock';
import { ContainerBlock } from '../Blocks/ContainerBlock';

interface CenterPanelProps {
    blocks: Block[];
    selectedBlock: Block | null;
    onSelectBlock: (block: Block) => void;
    onAddChild: (parentId: string, type: Block['type']) => void;
    onDragStart: (e: React.DragEvent, block: Block, index: number) => void;
    onDragOver: (e: React.DragEvent, parentId?: string) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, parentId?: string, index?: number) => void;
    onDragEnd: () => void;
    dragOverParent: string | null;
    draggedItem: any;
}

export function CenterPanel({
                                blocks,
                                selectedBlock,
                                onSelectBlock,
                                onAddChild,
                                onDragStart,
                                onDragOver,
                                onDragLeave,
                                onDrop,
                                onDragEnd,
                                dragOverParent,
                                draggedItem
                            }: CenterPanelProps) {
    const renderBlock = (block: Block, index: number) => {
        const props = {
            block,
            onClick: () => onSelectBlock(block),
            isSelected: selectedBlock?.id === block.id,
            onAddChild,
            onSelectBlock,
            selectedBlock,
            onDragStart,
            onDragOver,
            onDragLeave,
            onDrop,
            onDragEnd,
            dragOverParent,
            draggedItem,
            index
        };

        switch (block.type) {
            case 'text':
                return <TextBlock key={block.id} {...props} />;
            case 'image':
                return <ImageBlock key={block.id} {...props} />;
            case 'contact':
                return <ContactBlock key={block.id} {...props} />;
            case 'container':
                return <ContainerBlock key={block.id} {...props} />;
            default:
                return null;
        }
    };

    return (
        <div
            className="site-preview"
            onDragOver={(e) => onDragOver(e, undefined)}
            onDrop={(e) => onDrop(e, undefined, blocks.length)}
        >
            <h1 className="site-title">Сайт-визитка</h1>

            <div
                className={`
          drop-zone 
          ${dragOverParent === null ? 'active' : ''}
        `}
                style={{
                    height: dragOverParent === null ? '4px' : '2px',
                    marginBottom: '10px'
                }}
            />

            {blocks.map((block, index) => renderBlock(block, index))}

            <div
                className={`
          drop-zone 
          ${dragOverParent === null ? 'after' : ''}
        `}
                style={{ height: dragOverParent === null ? '4px' : '2px' }}
            />
        </div>
    );
}
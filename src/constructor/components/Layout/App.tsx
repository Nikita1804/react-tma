import { useState } from 'react';
import { Block, SiteData } from '../../types';
import { LeftPanel } from './LeftPanel';
import { CenterPanel } from './CenterPanel';
import { RightPanel } from './RightPanel';
import { useDragDrop } from '../../hooks/useDragDrop';
import { findBlock, removeBlockFromTree, insertBlockIntoTree, canMoveBlock } from '../../utils/treeUtils';
import styles from '../../styles/global.module.css'
import '../../styles/drag-drop.css';
import '../../styles/blocks.css';

function App() {
    const [siteData, setSiteData] = useState<SiteData>({
        title: 'Мой сайт-визитка',
        blocks: []
    });

    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

    const {
        draggedItem,
        dragOverParent,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd
    } = useDragDrop();

    const addBlock = (type: Block['type'], parentId?: string) => {
        const newBlock: Block = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: type === 'text'
                ? 'Новый текстовый блок'
                : type === 'image'
                    ? 'https://dorss-market.com/upload/iblock/f88/xcwpff0oczz2l4295rckee1yd2o4hiej.png'
                    : type === 'contact'
                        ? 'Email: example@mail.com\nPhone: +7 (999) 999-99-99'
                        : '',
            styles: type === 'container' ? { display: 'block' } : {},
            children: [],
            parentId
        };

        if (parentId) {
            setSiteData(prev => ({
                ...prev,
                blocks: prev.blocks.map(block =>
                    block.id === parentId
                        ? { ...block, children: [...block.children, newBlock] }
                        : block
                )
            }));
        } else {
            setSiteData(prev => ({
                ...prev,
                blocks: [...prev.blocks, newBlock]
            }));
        }
    };

    const addChildBlock = (parentId: string, type: Block['type']) => {
        addBlock(type, parentId);
    };

    const updateBlock = (blockId: string, updates: Partial<Block>) => {
        const updateBlockInTree = (blocks: Block[]): Block[] => {
            return blocks.map(block => {
                if (block.id === blockId) {
                    return { ...block, ...updates };
                }
                if (block.children.length > 0) {
                    return { ...block, children: updateBlockInTree(block.children) };
                }
                return block;
            });
        };

        setSiteData(prev => ({
            ...prev,
            blocks: updateBlockInTree(prev.blocks)
        }));

        if (selectedBlock && selectedBlock.id === blockId) {
            setSelectedBlock(prev => prev ? { ...prev, ...updates } : null);
        }
    };

    const deleteBlock = (blockId: string) => {
        setSiteData(prev => ({
            ...prev,
            blocks: removeBlockFromTree(prev.blocks, blockId)
        }));

        if (selectedBlock?.id === blockId) {
            setSelectedBlock(null);
        }
    };

    const handleDropWithLogic = (e: React.DragEvent, targetParentId?: string, targetIndex?: number) => {
        const dropResult = handleDrop(e, targetParentId, targetIndex);
        if (!dropResult || !draggedItem) return;

        const { draggedItem: item, targetParentId: newParentId, targetIndex: newIndex } = dropResult;

        if (!canMoveBlock(item.id, newParentId, siteData.blocks)) {
            return;
        }

        const blockToMove = findBlock(siteData.blocks, item.id);
        if (!blockToMove) return;

        const blocksWithoutMoved = removeBlockFromTree(siteData.blocks, item.id);
        const updatedBlock = {
            ...blockToMove,
            parentId: newParentId || undefined
        };

        const newBlocks = insertBlockIntoTree(
            blocksWithoutMoved,
            updatedBlock,
            newParentId,
            newIndex
        );

        setSiteData(prev => ({
            ...prev,
            blocks: newBlocks
        }));

        if (selectedBlock?.id === item.id) {
            setSelectedBlock(updatedBlock);
        }
    };

    return (
        <div className={styles.appContainer}>
            <div className={`${styles.panel} ${styles.leftPanel}`}>
                <LeftPanel
                    blocks={siteData.blocks}
                    onAddBlock={addBlock}
                    onSelectBlock={setSelectedBlock}
                    selectedBlock={selectedBlock}
                />
            </div>

            <div className={`${styles.panel} ${styles.centerPanel}`}>
                <CenterPanel
                    blocks={siteData.blocks}
                    selectedBlock={selectedBlock}
                    onSelectBlock={setSelectedBlock}
                    onAddChild={addChildBlock}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropWithLogic}
                    onDragEnd={handleDragEnd}
                    dragOverParent={dragOverParent}
                    draggedItem={draggedItem}
                />
            </div>

            <div className={`${styles.panel} ${styles.rightPanel}`}>
                <RightPanel
                    selectedBlock={selectedBlock}
                    onUpdateBlock={updateBlock}
                    onDeleteBlock={deleteBlock}
                    onAddChild={addChildBlock}
                />
            </div>
        </div>
    );
}

export default App;
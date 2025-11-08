import { Block } from '../types';

export function findBlock(blocks: Block[], id: string): Block | null {
    for (const block of blocks) {
        if (block.id === id) return block;
        if (block.children.length > 0) {
            const found = findBlock(block.children, id);
            if (found) return found;
        }
    }
    return null;
}

export function removeBlockFromTree(blocks: Block[], id: string): Block[] {
    return blocks.filter(block => {
        if (block.id === id) return false;
        if (block.children.length > 0) {
            block.children = removeBlockFromTree(block.children, id);
        }
        return true;
    });
}

export function insertBlockIntoTree(
    blocks: Block[],
    block: Block,
    parentId: string | null,
    index: number
): Block[] {
    if (parentId === null) {
        // Вставляем в корень
        const newBlocks = [...blocks];
        newBlocks.splice(index >= 0 ? index : newBlocks.length, 0, block);
        return newBlocks;
    }

    return blocks.map(b => {
        if (b.id === parentId) {
            const newChildren = [...b.children];
            newChildren.splice(index >= 0 ? index : newChildren.length, 0, block);
            return { ...b, children: newChildren };
        }
        if (b.children.length > 0) {
            return { ...b, children: insertBlockIntoTree(b.children, block, parentId, index) };
        }
        return b;
    });
}

export function canMoveBlock(blockId: string, targetParentId: string | null, blocks: Block[]): boolean {
    // Нельзя перемещать блок в самого себя
    if (targetParentId === blockId) return false;

    // Нельзя перемещать блок в своего потомка
    const block = findBlock(blocks, blockId);
    if (!block) return false;

    const checkIfDescendant = (parentId: string, child: Block): boolean => {
        if (child.id === parentId) return true;
        return child.children.some(grandChild => checkIfDescendant(parentId, grandChild));
    };

    if (targetParentId && checkIfDescendant(targetParentId, block)) {
        return false;
    }

    return true;
}
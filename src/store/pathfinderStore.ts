import { create } from 'zustand';
import { INode } from '@/features/pathfinder/types';
import { getInitialGrid } from '@/features/pathfinder/utils/gridGenerator';

interface PathfinderState {
  grid: INode[][];
  isMousePressed: boolean;
  setMousePressed: (isPressed: boolean) => void;
  toggleWall: (row: number, col: number) => void;
  resetGrid: () => void;
  setGrid: (newGrid: INode[][]) => void;
}

export const usePathfinderStore = create<PathfinderState>((set, get) => ({
  grid: getInitialGrid(),
  isMousePressed: false,
  setMousePressed: (isPressed) => set({ isMousePressed: isPressed }),

  toggleWall: (row, col) => {
    const currentGrid = get().grid;
    const node = currentGrid[row][col];
    if (node.isStart || node.isFinish) return;
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[row][col] = {
      ...node,
      isWall: !node.isWall,
    };

    set({ grid: newGrid });
  },
  resetGrid: () => set({ grid: getInitialGrid(), isMousePressed: false }),
  setGrid: (newGrid) => set({ grid: newGrid }),
}));
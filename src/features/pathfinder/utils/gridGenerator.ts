import { INode } from "../types";

export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 35;

export const createNode = (col: number, row: number): INode => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity, 
    isVisited: false,
    isWall: false,
    isPath: false,
    previousNode: null,
  };
};

export const getInitialGrid = (rowCount = 20, colCount = 50): INode[][] => {
  const grid: INode[][] = [];
  for (let row = 0; row < rowCount; row++) {
    const currentRow: INode[] = [];
    for (let col = 0; col < colCount; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
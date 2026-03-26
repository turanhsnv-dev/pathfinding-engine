export type NodeType = "start" | "finish" | "wall" | "empty";

export interface INode {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited: boolean; 
  isPath: boolean;    
  distance: number; 
  previousNode: INode | null; 
}
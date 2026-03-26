import { INode } from "../types";

export const dijkstra = (grid: INode[][], startNode: INode, finishNode: INode): INode[] => {
  const visitedNodesInOrder: INode[] = []; 
  startNode.distance = 0; 
  
  const unvisitedNodes = getAllNodes(grid); 

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    
    const closestNode = unvisitedNodes.shift();

    if (!closestNode || closestNode.isWall) continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
  
  return visitedNodesInOrder;
};


const sortNodesByDistance = (unvisitedNodes: INode[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node: INode, grid: INode[][]) => {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1; // Hər addım 1 vahid məsafədir
    neighbor.previousNode = node; // Çörək qırıntısı: "Mən bu qonşuya səndən gəldim" deyə qeyd qoyuruq
  }
};

const getUnvisitedNeighbors = (node: INode, grid: INode[][]) => {
  const neighbors: INode[] = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

const getAllNodes = (grid: INode[][]) => {
  const nodes: INode[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const getNodesInShortestPathOrder = (finishNode: INode): INode[] => {
  const nodesInShortestPathOrder: INode[] = [];
  let currentNode: INode | null = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode); 
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
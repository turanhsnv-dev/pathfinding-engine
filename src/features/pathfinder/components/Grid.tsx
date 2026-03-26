"use client";

import { usePathfinderStore } from "@/store/pathfinderStore";
import { Node } from "./Node";
import { START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL } from "../utils/gridGenerator";
import { dijkstra, getNodesInShortestPathOrder } from "../utils/dijkstra";
import { Play, RotateCcw } from "lucide-react";

export const Grid = () => {
  const { grid, isMousePressed, setMousePressed, toggleWall, resetGrid } = usePathfinderStore();

  const handleMouseDown = (row: number, col: number) => {
    setMousePressed(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMousePressed) return;
    toggleWall(row, col);
  };

  const handleMouseUp = () => setMousePressed(false);

  const animateShortestPath = (nodesInShortestPathOrder: any[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = "w-6 h-6 node-shortest-path shadow-md z-20";
        }
      }, 50 * i); // Hər sarı xana 50 millisaniyə fərqlə çıxır
    }
  };

  const animateDijkstra = (visitedNodesInOrder: any[], nodesInShortestPathOrder: any[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // Bütün axtarış bitəndən sonra (sonuncu dövrdə) qısa yolu sarı rənglə çək
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      
      // Axtarış dalğasını (Mavi rəng) yarat
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = "w-6 h-6 node-visited";
        }
      }, 10 * i); // Hər mavi xana 10 millisaniyə fərqlə çıxır
    }
  };

  const visualizeDijkstra = () => {
    const currentGrid = [...grid.map(row => [...row])];
    const startNode = currentGrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = currentGrid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = dijkstra(currentGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="flex flex-col items-center select-none w-full pb-20">
      
      <div className="flex items-center gap-4 mb-8 bg-white p-3 rounded-2xl shadow-sm border border-neutral-200">
        <button 
          onClick={visualizeDijkstra}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Play size={18} fill="currentColor" /> Dijkstra-nı İşə Sal!
        </button>
        
        <button 
          onClick={() => {
            resetGrid();
            document.querySelectorAll('.node-visited, .node-shortest-path').forEach(el => {
              el.className = "w-6 h-6 border-[0.5px] border-blue-100 bg-white transition-colors";
            });
          }}
          className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2.5 rounded-xl font-medium transition-all active:scale-95"
        >
          <RotateCcw size={18} /> Təmizlə
        </button>
      </div>

      {/* Şəbəkə (Grid) */}
      <div 
        className="bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden p-3 cursor-crosshair"
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                col={node.col}
                row={node.row}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isWall={node.isWall}
                isVisited={node.isVisited}
                isPath={node.isPath}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
"use client";

import React from "react";

interface NodeProps {
  col: number;
  row: number;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const Node = React.memo(({
  col, row, isFinish, isStart, isWall, isVisited, isPath,
  onMouseDown, onMouseEnter, onMouseUp
}: NodeProps) => {

  let extraClassName = "bg-white";
  if (isFinish) extraClassName = "bg-red-500 scale-110 shadow-lg z-10 rounded-sm";
  else if (isStart) extraClassName = "bg-green-500 scale-110 shadow-lg z-10 rounded-sm";
  else if (isWall) extraClassName = "bg-neutral-800 scale-105 rounded-sm transition-transform duration-200";
  else if (isPath) extraClassName = "bg-yellow-400";
  else if (isVisited) extraClassName = "bg-cyan-200/50";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border-[0.5px] border-blue-100 transition-colors ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onDragStart={(e) => e.preventDefault()}
    />
  );
});

Node.displayName = "Node";
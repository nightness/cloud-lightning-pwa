import "./index.css";
import I from "./blocks/I";
import J from "./blocks/J";
import L from "./blocks/L";
import O from "./blocks/O";
import S from "./blocks/S";
import T from "./blocks/T";
import Z from "./blocks/Z";
import XO from "./blocks/XO";
import TestPanel from "./TestPanel";
import Tetris from "./TetrisPage";
import TetrisBoard from "./TetrisBoard";
import Block, { BlockProps, BlockType, OrientationValue } from "./blocks/Block";

export { Block, Tetris, TetrisBoard, TestPanel };
export { I, J, L, O, S, T, Z, XO };

export type Plane = number[][];
export type Size = [number, number];
export type Location = {
  row: number;
  column: number;
};

export type { BlockProps, BlockType, OrientationValue };

export const TOTAL_ROWS = 20;
export const TOTAL_COLUMNS = 10;
export const BLOCK_SIZE = 25; // Pixels
export const STARTING_SPEED = 1000; // ms
export const FASTEST_RATE = 100; // down by one per 100ms

export const createNewBoard = (
  height: number = TOTAL_ROWS,
  width: number = TOTAL_COLUMNS
) => {
  const board = Array(height)
    .fill(0)
    .map((x) => Array(width).fill(0));
  return board as Plane;
};

export const copyBoard = (board: Plane) => {
  return board.map((arr) => arr.slice());
};

export const getBoardSubset = (
  board: Plane,
  row: number,
  column: number,
  size: Size
) => {
  const results = createNewBoard(size[0], size[1]);
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      //console.log("Test: ", board[column + c][row + r], column, row, c, r)
      results[i][j] = board[row + i][column + j];
    }
  }
  return results;
};

export const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

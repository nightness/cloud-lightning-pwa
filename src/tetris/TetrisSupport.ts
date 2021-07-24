import { BlockType, OrientationValue } from ".";

export type TwoDimNumberArray = number[][];
export type Size = [number, number];
export type Location = {
  row: number;
  column: number;
};

export const createNewBoard = (height: number = 20, width: number = 10) => {
  const board = Array(height)
    .fill(0)
    .map((x) => Array(width).fill(0));
  return board as TwoDimNumberArray;
};

export const copyBoard = (board: TwoDimNumberArray) => {
  return board.map((arr) => arr.slice());
};

export const getBoardSubset = (
  board: TwoDimNumberArray,
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

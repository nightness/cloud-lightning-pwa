import React, { useState } from "react";

const TOTAL_ROWS = 6;
const TOTAL_COLUMNS = 7;

type Player = 1 | 2;
type BoardValue = 0 | 1 | 2;
type Board = BoardValue[][];

// Looks to see if either player won, if so it returns that's player's number id
type FindWinner = (board: BoardValue[][]) => Player | void | undefined;
const findWinner: FindWinner = (board) => {};

// Returns [Row, Column] in a tuple of the, if row and column are negative, their is
// no move and the game is over.
type ComputerMove = (board: Board, maximizeFor: Player) => [number, number];
const computerMove: ComputerMove = (board, maximizeFor) => {
  let row = -1;
  let column = -1;

  return [row, column];
};

export const createNewBoard = (
  height: number = TOTAL_ROWS,
  width: number = TOTAL_COLUMNS
) => {
  const board = Array(height)
    .fill(0)
    .map((x) => Array(width).fill(0));
  return board as Board;
};

export const copyBoard = (board: Board) => {
  return board.map((arr) => arr.slice());
};

export const getBoardSubset = (
  board: Board,
  row: number,
  column: number,
  height: number,
  width: number
) => {
  const results = createNewBoard(height, width);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      results[i][j] = board[row + i][column + j];
    }
  }
  return results;
};

export default function ConnectFourBoard() {
  const [board, setBoard] = useState<Board>(createNewBoard());

  return (
    <div className="tetris-board">
      <div className="tetris-board-inner">
        {board?.map((value) => (
          <div
            style={{ display: "flex", flexDirection: "row" }}
            key={`${Math.random()}`}
          >
            {value.map((v) => (
              <div
                className={`board-block board-block-${v}`}
                key={`${Math.random()}`}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

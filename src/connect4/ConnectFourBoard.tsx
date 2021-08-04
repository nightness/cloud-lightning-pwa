import React, { useState } from "react";
import { ConsoleContainer } from "../components";

const TOTAL_ROWS = 6;
const TOTAL_COLUMNS = 7;

type Player = 1 | 2;
type BoardValue = 0 | 1 | 2;
type Board = BoardValue[][];

// Looks to see if either player won, if so it returns that's player's number id
type FindWinner = (board: BoardValue[][]) => Player | void | undefined;
const findWinner: FindWinner = (board) => {
  let winner = 0;

  const getColumn = (column: number) => {
    const result: number[] = [];
    for (let i = 0; i < board.length; i++) {
      result.push(board[i][column]);
    }
    return result;
  };

  const getDiangle = () => {
    const iLength = board.length;
    const jLength = board[0].length;
    const result: number[][] = [];
    for (let i = 0; i < iLength; i++) {
      let iDrift = i;
      const row: number[] = [];
      for (let j = 0; j < jLength && iDrift < iLength; j++) {
        row.push(board[iDrift++][j]);
      }
      if (row.length >= 4) result.push(row);
    }
    for (let j = jLength - 1; j >= 0 ; j--) {
      let jDrift = j;
      const row: number[] = [];
      for (let i = 0; i < iLength && jDrift >= 0; i++) {
        row.push(board[i][jDrift--]);
      }
      if (row.length >= 4) result.push(row);
    }
    for (let i = iLength - 1; i >= 0; i--) {
      let iDrift = i;
      const row: number[] = [];
      for (let j = 0; j < jLength && iDrift >= 0; j++) {
        row.push(board[iDrift--][j]);
      }
      if (row.length >= 4) result.push(row);
    }    
    for (let j = jLength - 1; j >= 0; j--) {
      let jDrift = j;
      const row: number[] = [];
      for (let i = iLength - 1; i >= 0 && jDrift >= 0; i--) {
        row.push(board[i][jDrift--]);
      }
      if (row.length >= 4) result.push(row);
    }
    return result;
  };

  // Row win detection
  board.forEach((row, idx) => {
    const resultStr = row.toString().replaceAll(",", "");
    if (resultStr.indexOf("1111") >= 0 || resultStr.indexOf("2222") >= 0) {
      winner = resultStr.indexOf("1111") >= 0 ? 1 : 2;
    }
  });
  if (winner) return winner as Player;

  // Column win detection
  for (let i = 0; i < board.length; i++) {
    const column = getColumn(i);
    const resultStr = column.toString().replaceAll(",", "");
    if (resultStr.indexOf("1111") >= 0 || resultStr.indexOf("2222") >= 0) {
      winner = resultStr.indexOf("1111") >= 0 ? 1 : 2;
    }
  }
  if (winner) return winner as Player;

  // Diangle win detections
  const results = getDiangle();
  for (let i = 0; i < results.length; i++) {
    const resultStr = results[i].toString().replaceAll(",", "");
    if (resultStr.indexOf("1111") >= 0 || resultStr.indexOf("2222") >= 0) {
      winner = resultStr.indexOf("1111") >= 0 ? 1 : 2;
    }
  }

  return winner ? (winner as Player) : undefined;
};

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

  const handleClick = (rIdx: number, cIdx: number) => {
    const newBoard = copyBoard(board);
    newBoard[rIdx][cIdx] =
      board[rIdx][cIdx] === 0 ? 1 : board[rIdx][cIdx] === 1 ? 2 : 0;
    setBoard(newBoard);
    const result = findWinner(newBoard);
    console.log("findWinner: ", result);
  };

  return (
    <div className="game-board">
      <div className="game-board-inner">
        {board?.map((value, rIdx) => (
          <div
            style={{ display: "flex", flexDirection: "row" }}
            key={`${Math.random()}`}
          >
            {value.map((v, cIdx) => (
              <div
                className={`board-block`}
                style={{ userSelect: "none", cursor: "pointer" }}
                onClick={() => handleClick(rIdx, cIdx)}
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

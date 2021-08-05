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

  const getDiagonal = () => {
    const iLength = board.length;
    const jLength = board[0].length;
    const result: number[][] = [];
    for (let i = 0; i < iLength; i++) {
      let rowUp: number[] = [];
      let rowDown: number[] = [];
      for (let j = 0, shearUp = i, shearDown = i; j < jLength; j++) {
        if (shearDown >= 0)
          rowDown.push(board[shearDown--][j]);
        if (shearUp < iLength)
          rowUp.push(board[shearUp++][j]);
      }
      if (rowUp.length >= 4) result.push(rowUp);
      if (rowDown.length >= 4) result.push(rowDown);
      rowUp = [];
      rowDown = [];
      for (let j = jLength - 1, shearUp = i, shearDown = i; j >= 0; j--) {
        if (shearDown >= 0)
          rowDown.push(board[shearDown--][j]);
        if (shearUp < iLength)
          rowUp.push(board[shearUp++][j]);
      }
      if (rowUp.length >= 4) result.push(rowUp);
      if (rowDown.length >= 4) result.push(rowDown);
    }
    console.log(result)
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
  for (let i = 0; i < board[0].length; i++) {
    const column = getColumn(i);
    const resultStr = column.toString().replaceAll(",", "");
    if (resultStr.indexOf("1111") >= 0 || resultStr.indexOf("2222") >= 0) {
      winner = resultStr.indexOf("1111") >= 0 ? 1 : 2;
    }
  }
  if (winner) return winner as Player;

  // Diagonal win detections
  const results = getDiagonal();
  for (let i = 0; i < results.length; i++) {
    const resultStr = results[i].toString().replaceAll(",", "");
    if (resultStr.indexOf("1111") >= 0 || resultStr.indexOf("2222") >= 0) {
      winner = resultStr.indexOf("1111") >= 0 ? 1 : 2;
    }
  }

  return winner ? (winner as Player) : undefined;
};

const biases = [
  [0, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 4, 3, 2, 1],
  [2, 3, 4, 5, 4, 3, 2],
  [3, 4, 5, 6, 5, 4, 3],
  [4, 5, 6, 7, 6, 5, 4],
  [5, 6, 7, 8, 7, 6, 5],
];

// Returns the column, if drop column is negative, their is
// no move available and the game is over.
type ComputerMove = (board: Board, maximizeFor: Player) => number;
const computerMove: ComputerMove = (board, maximizeFor) => {
  let column = -1;

  return column;
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
      {/* <div style={{ margin: "5px" }} />
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
                key={`${Math.random()}`}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}

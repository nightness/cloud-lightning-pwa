import React, { useState } from "react";

const TOTAL_ROWS = 6;
const TOTAL_COLUMNS = 7;

type Player = 1 | 2;
type BoardValue = 0 | Player;
type Board = BoardValue[][];

const findWinner = (board: Board) => {
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
        if (shearDown >= 0) rowDown.push(board[shearDown--][j]);
        if (shearUp < iLength) rowUp.push(board[shearUp++][j]);
      }
      if (rowUp.length >= 4) result.push(rowUp);
      if (rowDown.length >= 4) result.push(rowDown);
      rowUp = [];
      rowDown = [];
      for (let j = jLength - 1, shearUp = i, shearDown = i; j >= 0; j--) {
        if (shearDown >= 0) rowDown.push(board[shearDown--][j]);
        if (shearUp < iLength) rowUp.push(board[shearUp++][j]);
      }
      if (rowUp.length >= 4) result.push(rowUp);
      if (rowDown.length >= 4) result.push(rowDown);
    }
    console.log(result);
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
  const [player, setPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const handleClick = (rIdx: number, cIdx: number) => {
    const newBoard = copyBoard(board);

    // Is the column full?
    const isColumnFull = newBoard[0][cIdx] !== 0;
    if (isColumnFull || winner) return;

    // find the lowest empty cell in the column
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (newBoard[i][cIdx] === 0) {
        newBoard[i][cIdx] = player;
        break;
      }
    }

    // Update the board
    setBoard(newBoard);

    // Check for a winner
    const result = findWinner(newBoard);
    if (result) {
      console.log("findWinner: ", result);
      setWinner(result);
    } else {
      // Switch players
      setPlayer((p) => (p === 1 ? 2 : 1));
    }
  };

  return (
    <div className="game-board">
      <div
        className="game-board-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "240px",
          height: "240px",
        }}
      >
        {board?.map((value, rIdx) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "240px",
              height: "240px",
            }}
            key={`${Math.random()}`}
          >
            {value.map((v, cIdx) => (
              <div
                className={`board-block`}
                style={{
                  userSelect: "none",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  width: "40px",
                  height: "40px",
                }}
                onClick={() => handleClick(rIdx, cIdx)}
                key={`${Math.random()}`}
              >
                <div
                  style={{
                    userSelect: "none",
                    cursor: "pointer",
                    width: "85%",
                    height: "75%",
                    backgroundColor:
                      v === 1 ? "red" : v === 2 ? "yellow" : "transparent",
                    borderRadius: "50%",
                    borderWidth: v > 0 ? "1px" : 0,
                    borderStyle: "solid",
                    borderColor: "black",
                    alignSelf: "center",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {winner && (
          <div>
            <h1>Winner: {winner}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

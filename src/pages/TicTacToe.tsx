import "./TicTacToe.css";
import { useEffect, useState } from "react";
import { Button, Page } from "../components";

type Board = [
  [string, string, string],
  [string, string, string],
  [string, string, string]
];

const createNewBoard = (existing?: Board) => {
  const result = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ] as Board;

  if (!existing) return result;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      result[r][c] = existing[r][c];
    }
  }

  return result
}

export default () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [board, setBoard] = useState(createNewBoard());
  const [turn, setTurn] = useState<"X" | "O">();

  const onClickAnyCell = (row: number, col: number) => {
    if (!isStarted || !turn || gameOver) return;
    const newBoard = createNewBoard(board);
    newBoard[row][col] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const eval3 = (a: string, b: string, c: string) =>  a && a === b && b === c && a ===c;

  useEffect(() => {
    let newGameOver = gameOver;
    const results =  {
      row1: eval3(board[0][0], board[0][1], board[0][2]),
      row2: eval3(board[1][0], board[1][1], board[1][2]),
      row3: eval3(board[2][0], board[2][1], board[2][2]),

      col1: eval3(board[0][0], board[1][0], board[2][0]),
      col2: eval3(board[0][1], board[1][1], board[2][1]),
      col3: eval3(board[0][2], board[1][2], board[2][2]),

      d1: eval3(board[0][0], board[1][1], board[2][2]),
      d2: eval3(board[2][0], board[1][1], board[2][2]),
      filled:
        board[0][0] &&
        board[0][1] &&
        board[0][2] &&
        board[1][0] &&
        board[1][1] &&
        board[1][2] &&
        board[2][0] &&
        board[2][1] &&
        board[2][2]
    }
    //console.log(results, board)
    setGameOver(
      newGameOver ||
        !!results.row1 ||
        !!results.row2 ||
        !!results.row3 ||
        !!results.col1 ||
        !!results.col2 ||
        !!results.col3 ||
        !!results.d1 ||
        !!results.d2 ||
        !!results.filled
    );
  }, [board]);

  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div
        className="ttt-box"
        style={{
          display: "flex",
          alignSelf: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: 1, flexDirection: "column" }}>
          <div className="ttt-box" onClick={() => onClickAnyCell(0, 0)}>
            {board[0][0]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(1, 0)}>
            {board[1][0]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(2, 0)}>
            {board[2][0]}
          </div>
        </div>
        <div style={{ flex: 1, flexDirection: "column" }}>
          <div className="ttt-box" onClick={() => onClickAnyCell(0, 1)}>
            {board[0][1]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(1, 1)}>
            {board[1][1]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(2, 1)}>
            {board[2][1]}
          </div>
        </div>
        <div style={{ flex: 1, flexDirection: "column" }}>
          <div className="ttt-box" onClick={() => onClickAnyCell(0, 2)}>
            {board[0][2]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(1, 2)}>
            {board[1][2]}
          </div>
          <div className="ttt-box" onClick={() => onClickAnyCell(2, 2)}>
            {board[2][2]}
          </div>
        </div>
      </div>
      {isStarted && !gameOver ? (
        <></>
      ) : (
        <Button
          title="Start"
          style={{ marginTop: 30, width: "25%" }}
          onPress={() => {
            setBoard(createNewBoard());
            setGameOver(false);
            setIsStarted(true);
            setTurn(Math.random() > 0.5 ? "X" : "O");
          }}
        />
      )}
    </Page>
  );
};

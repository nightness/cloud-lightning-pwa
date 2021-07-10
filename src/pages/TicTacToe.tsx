import "./TicTacToe.css";
import { useEffect, useState } from "react";
import { Button, Page } from "../components";

type Board = [
  [string, string, string],
  [string, string, string],
  [string, string, string]
];

const createNewBoard = () =>
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ] as Board;

export default () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(true)
  const [board, setBoard] = useState(createNewBoard());
  const [turn, setTurn] = useState<'X' | 'O'>() 

  const onClickAnyCell = (row: number, col: number) => {
    if (!isStarted || !turn) return;
    const newBoard = createNewBoard();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        newBoard[r][c] = board[r][c];
      }
    }
    newBoard[row][col] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X')
  };

  useEffect(() => {
    const row1 = board[0][0] !== '' && (board[0][0] === board[0][1]) && (board[0][1] === board[0][2])
    const row2 = board[1][0] !== '' && (board[1][0] === board[1][1]) && (board[1][1] === board[1][2])
    const row3 = board[2][0] !== '' && (board[2][0] === board[2][1]) && (board[2][1] === board[2][2])
    const col1 = board[0][0] !== '' && (board[0][0] === board[1][0]) && (board[1][0] === board[2][0])
    const col2 = board[0][1] !== '' && (board[0][1] === board[1][1]) && (board[1][1] === board[2][1])
    const col3 = board[0][2] !== '' && (board[0][2] === board[1][2]) && (board[1][2] === board[2][2])
    const d1 = board[0][0] !== '' && (board[0][0] === board[1][1]) && (board[1][1] === board[2][2])
    const d2 = board[0][2] !== '' && (board[0][2] === board[1][1]) && (board[1][1] === board[0][2])
    if (row1 || row2 || row3 || col1 || col2 || col3 || d1 || d2) {
      setGameOver(true);
    }      
  }, [board])

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
            setBoard(createNewBoard())
            setGameOver(false);
            setIsStarted(true);
            setTurn(Math.random() > 0.5 ? 'X' : 'O')
          }}
        />
      )}
    </Page>
  );
};

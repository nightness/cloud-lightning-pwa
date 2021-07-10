import "./TicTacToe.css";
import { useEffect, useState } from "react";
import { Button, Page, Text } from "../components";

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

  return result;
};

interface SegmentProps {
  index: number;
}

export default () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [board, setBoard] = useState(createNewBoard());
  const [turn, setTurn] = useState<"X" | "O">();
  const [playerIs, setPlayerIs] = useState<"X" | "O">();
  const [message, setMessage] = useState("");

  const onClickAnyCell = (row: number, col: number) => {
    if (!isStarted || !turn || gameOver || board[row][col] != "") return;
    const newBoard = createNewBoard(board);
    newBoard[row][col] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    setMessage(turn === playerIs ? "Computer's Turn" : "Player's Turn");
  };

  const eval3 = (a: string, b: string, c: string) =>
    a && a === b && b === c && a === c;
  const evalRow = (index: number) =>
    eval3(board[index][0], board[index][1], board[index][2]);
  const evalCol = (index: number) =>
    eval3(board[0][index], board[1][index], board[2][index]);
  const isFilled = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const results = {
      row1: evalRow(0),
      row2: evalRow(1),
      row3: evalRow(2),

      col1: evalCol(0),
      col2: evalCol(1),
      col3: evalCol(2),

      d1: eval3(board[0][0], board[1][1], board[2][2]),
      d2: eval3(board[0][2], board[1][1], board[2][0]),
      filled: isFilled(),
    };

    const isOver =
      results.row1 ||
      results.row2 ||
      results.row3 ||
      results.col1 ||
      results.col2 ||
      results.col3 ||
      results.d1 ||
      results.d2 ||
      results.filled;

    const flipTurn = turn === 'O' ? 'X' : 'O'
    const winner = results.filled ? undefined : flipTurn 
    if (isOver) {
      if (!winner) setMessage("Tie Game")
      else if (winner == playerIs) setMessage("Player Wins!")
      else setMessage("Computer Wins")  
    }
    setGameOver(isOver);
  }, [board]);

  const Segment = ({ index }: SegmentProps) => (
    <div style={{ flex: 1, flexDirection: "column" }}>
      <div className="ttt-box" onClick={() => onClickAnyCell(0, index)}>
        {board[0][index]}
      </div>
      <div className="ttt-box" onClick={() => onClickAnyCell(1, index)}>
        {board[1][index]}
      </div>
      <div className="ttt-box" onClick={() => onClickAnyCell(2, index)}>
        {board[2][index]}
      </div>
    </div>
  );

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
        <Segment index={0} />
        <Segment index={1} />
        <Segment index={2} />
      </div>
      <Text>{message}</Text>
      {isStarted && !gameOver ? (
        <></>
      ) : (
        <Button
          title="Start"
          style={{ marginTop: 30, width: "25%" }}
          onPress={() => {
            const symbol = Math.random() > 0.5 ? "X" : "O";
            setBoard(createNewBoard());
            setGameOver(false);
            setIsStarted(true);
            setPlayerIs(symbol);
            setTurn("X");
            setMessage(symbol === "O" ? "Computer's Turn" : "Player's Turn");
          }}
        />
      )}
    </Page>
  );
};

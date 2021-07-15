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
  results: string;
  board: Board;
}

export default () => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [board, setBoard] = useState(createNewBoard());
  const [turn, setTurn] = useState<"X" | "O">();
  const [playerIs, setPlayerIs] = useState<"X" | "O">();
  const [message, setMessage] = useState("");
  const [winResults, setWinResult] = useState<string>("");
  const [turnCount, setTurnCount] = useState(0);

  const onClickAnyCell = (row: number, col: number) => {
    if (!isStarted || !turn || gameOver || board[row][col] != "") return;
    const newBoard = createNewBoard(board);
    newBoard[row][col] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    setTurnCount(turnCount + 1);
    setMessage(
      turn === playerIs
        ? "Computer's Turn"
        : `Player's Turn (player is '${playerIs}')`
    );
  };

  // Used to determine computer's move
  // Return the unused index if only one of [(a === b) || (b === c) || (c === a)]
  // are true, and the other index is blank
  const eval2 = (a: string, b: string, c: string, symbol = playerIs) => {
    const results = !eval3(a, b, c);
    if (results && a === symbol && a === b && c === "") {
      return 2;
    } else if (results && b === symbol && b === c && a === "") {
      return 0;
    } else if (results && c === symbol && c === a && b === "") {
      return 1;
    }
    return false;
  };
  const eval3 = (a: string, b: string, c: string) => a && a === b && b === c;
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

  const delay = async () => {
    const delay = Math.floor(Math.random() * 1500);
    return new Promise((res) => setTimeout(res, delay));
  };

  // useEffect(() => {
  //   if (turn == playerIs) return;
  //   const timer = setTimeout(() => {
  //     callback.current();
  //   }, Math.floor(Math.random() * 1500));
  //   return () => clearTimeout(timer);
  // }, [turn]);

  const doComputersMove = () => {
    if (playerIs === turn) return;
    const mySymbol = turn === "O" ? "O" : "X";
    // For the win moves
    const results = {
      row1: eval2(board[0][0], board[0][1], board[0][2], mySymbol),
      row2: eval2(board[1][0], board[1][1], board[1][2], mySymbol),
      row3: eval2(board[2][0], board[2][1], board[2][2], mySymbol),
      col1: eval2(board[0][0], board[1][0], board[2][0], mySymbol),
      col2: eval2(board[0][1], board[1][1], board[2][1], mySymbol),
      col3: eval2(board[0][2], board[1][2], board[2][2], mySymbol),
      d1: eval2(board[0][0], board[1][1], board[2][2], mySymbol),
      d2: eval2(board[0][2], board[1][1], board[2][0], mySymbol),
    };
    const newBoard = createNewBoard(board);
    if (results.row1 !== false) newBoard[0][results.row1 as number] = mySymbol;
    else if (results.row2 !== false)
      newBoard[1][results.row2 as number] = mySymbol;
    else if (results.row3 !== false)
      newBoard[2][results.row3 as number] = mySymbol;
    else if (results.col1 !== false)
      newBoard[results.col1 as number][0] = mySymbol;
    else if (results.col2 !== false)
      newBoard[results.col2 as number][1] = mySymbol;
    else if (results.col3 !== false)
      newBoard[results.col3 as number][2] = mySymbol;
    else if (results.d1 !== false) {
      switch (results.d1) {
        case 0:
          newBoard[0][0] = mySymbol;
          break;
        case 1:
          newBoard[1][1] = mySymbol;
          break;
        case 2:
          newBoard[2][2] = mySymbol;
          break;
      }
    } else if (results.d2 !== false) {
      switch (results.d2) {
        case 0:
          newBoard[0][2] = mySymbol;
          break;
        case 1:
          newBoard[1][1] = mySymbol;
          break;
        case 2:
          newBoard[2][0] = mySymbol;
          break;
      }
    } else {
      // For the block moves
      const results = {
        row1: eval2(board[0][0], board[0][1], board[0][2]),
        row2: eval2(board[1][0], board[1][1], board[1][2]),
        row3: eval2(board[2][0], board[2][1], board[2][2]),
        col1: eval2(board[0][0], board[1][0], board[2][0]),
        col2: eval2(board[0][1], board[1][1], board[2][1]),
        col3: eval2(board[0][2], board[1][2], board[2][2]),
        d1: eval2(board[0][0], board[1][1], board[2][2]),
        d2: eval2(board[0][2], board[1][1], board[2][0]),
      };
      if (results.row1 !== false)
        newBoard[0][results.row1 as number] = mySymbol;
      else if (results.row2 !== false)
        newBoard[1][results.row2 as number] = mySymbol;
      else if (results.row3 !== false)
        newBoard[2][results.row3 as number] = mySymbol;
      else if (results.col1 !== false)
        newBoard[results.col1 as number][0] = mySymbol;
      else if (results.col2 !== false)
        newBoard[results.col2 as number][1] = mySymbol;
      else if (results.col3 !== false)
        newBoard[results.col3 as number][2] = mySymbol;
      else if (results.d1 !== false) {
        switch (results.d1) {
          case 0:
            newBoard[0][0] = mySymbol;
            break;
          case 1:
            newBoard[1][1] = mySymbol;
            break;
          case 2:
            newBoard[2][2] = mySymbol;
            break;
        }
      } else if (results.d2 !== false) {
        switch (results.d2) {
          case 0:
            newBoard[0][2] = mySymbol;
            break;
          case 1:
            newBoard[1][1] = mySymbol;
            break;
          case 2:
            newBoard[2][0] = mySymbol;
            break;
        }
      } else {    // There is no winning or blocking square available
        // Defend against a corner first attack
        if (turnCount === 1 && newBoard[0][0] === playerIs) {
          newBoard[2][2] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[0][2] === playerIs) {
          newBoard[2][0] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[2][0] === playerIs) {
          newBoard[0][2] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[2][2] === playerIs) {
          newBoard[0][0] = mySymbol;
        }
        // Defend against a corner cluster attack
        else if (turnCount === 1 && newBoard[0][1] === playerIs) { // Top row
          newBoard[0][Math.floor(Math.random() * 2) === 0 ? 0 : 2] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[1][0] === playerIs) {  // Left column
          newBoard[Math.floor(Math.random() * 2) === 0 ? 0 : 2][0] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[2][1] === playerIs) {  // Bottom row
          newBoard[2][Math.floor(Math.random() * 2) === 0 ? 0 : 2] = mySymbol;
        }
        else if (turnCount === 1 && newBoard[1][2] === playerIs) {  // Right column
          newBoard[Math.floor(Math.random() * 2) === 0 ? 0 : 2][2] = mySymbol;
        }
        // Take Center
        else if (newBoard[1][1] === "") newBoard[1][1] = mySymbol;
        // Corners
        else {
          let played = false;
          while (!played) {
            if (
              newBoard[0][0] !== "" &&
              newBoard[0][2] !== "" &&
              newBoard[2][0] !== "" &&
              newBoard[2][2] !== ""
            )
              break;
            switch (Math.floor(Math.random() * 4)) {
              case 0:
                if (newBoard[0][0] === "") {
                  newBoard[0][0] = mySymbol;
                  played = true;
                }
                break;
              case 1:
                if (newBoard[0][2] === "") {
                  newBoard[0][2] = mySymbol;
                  played = true;
                }
                break;
              case 2:
                if (newBoard[2][2] === "") {
                  newBoard[2][2] = mySymbol;
                  played = true;
                }
                break;
              case 3:
                if (newBoard[2][0] === "") {
                  newBoard[2][0] = mySymbol;
                  played = true;
                }
                break;
            }
          }

          // Can't decide, pick any open
          if (!played) {
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (newBoard[i][j] === "") {
                  newBoard[i][j] = mySymbol;
                  break;
                }
              }
            }
          }
        }
      }
    }
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    setTurnCount(turnCount + 1);
    setMessage(
      turn === playerIs
        ? "Computer's Turn"
        : `Player's Turn (player is '${playerIs}')`
    );
  };

  // Resets the text color to default
  useEffect(() => {
    if (!gameOver) return;
    setPlayerIs(undefined);
    setTurnCount(0);
  }, [gameOver]);

  useEffect(() => {
    if (!isStarted) return;
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

    let testResults = "";
    const values = Object.values(results);
    Object.keys(results).forEach((key, index) => {
      if (values[index] === true) {
        setWinResult(key);
        testResults = key;
      }
    });

    const isOver = testResults.length > 0;
    const flipTurn = turn === "O" ? "X" : "O";
    const winner = results.filled ? undefined : flipTurn;
    if (isOver && !winner) setMessage("Tie Game");
    else if (isOver && winner == playerIs) setMessage("Player Wins!");
    else if (isOver) setMessage("Computer Wins");
    else if (turn !== playerIs) doComputersMove();
    if (gameOver != isOver) setGameOver(isOver);
  }, [board]);

  const getStyleFromWinResults = (
    row: number,
    column: number,
    results: string
  ) => {
    const isPartOfD1 =
      (row === 0 && column === 0) ||
      (row === 1 && column == 1) ||
      (row === 2 && column == 2);
    const isPartOfD2 =
      (row === 0 && column === 2) ||
      (row === 1 && column == 1) ||
      (row === 2 && column == 0);
    const winner = playerIs === turn ? turn : turn === "O" ? "X" : "O";
    if (results === "row1" && row === 0) return `ttt-box-win${winner}`;
    if (results === "row2" && row === 1) return `ttt-box-win${winner}`;
    if (results === "row3" && row === 2) return `ttt-box-win${winner}`;
    if (results === "col1" && column === 0) return `ttt-box-win${winner}`;
    if (results === "col2" && column === 1) return `ttt-box-win${winner}`;
    if (results === "col3" && column === 2) return `ttt-box-win${winner}`;
    if (results === "d1" && isPartOfD1) return `ttt-box-win${winner}`;
    if (results === "d2" && isPartOfD2) return `ttt-box-win${winner}`;
    return "";
  };

  const Segment = ({ index, results, board }: SegmentProps) => (
    <div style={{ flex: 1, flexDirection: "column" }}>
      <div
        className={`ttt-box-common ttt-box${
          board[0][index]
        } ${getStyleFromWinResults(0, index, results)}`}
        onClick={() => onClickAnyCell(0, index)}
      >
        {board[0][index]}
      </div>
      <div
        className={`ttt-box-common ttt-box${
          board[1][index]
        } ${getStyleFromWinResults(1, index, results)}`}
        onClick={() => onClickAnyCell(1, index)}
      >
        {board[1][index]}
      </div>
      <div
        className={`ttt-box-common ttt-box${
          board[2][index]
        } ${getStyleFromWinResults(2, index, results)}`}
        onClick={() => onClickAnyCell(2, index)}
      >
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
      <div className="ttt-container">
        <div className="ttt-board">
          <Segment index={0} results={winResults} board={board} />
          <Segment index={1} results={winResults} board={board} />
          <Segment index={2} results={winResults} board={board} />
        </div>
        <Text
          className={`ttt-box${playerIs}`}
          style={{ backgroundColor: "transparent" }}
        >
          {message}
        </Text>
        {isStarted && !gameOver ? (
          <></>
        ) : (
          <Button
            intent="primary"
            text="Start"
            style={{ marginTop: 30, width: "25%" }}
            onClick={() => {
              const symbol = Math.random() > 0.5 ? "X" : "O";
              setBoard(createNewBoard());
              setGameOver(false);
              setIsStarted(true);
              setPlayerIs(symbol);
              setWinResult("");
              setTurn("X");
              setMessage(
                symbol === "O"
                  ? "Computer's Turn"
                  : `Player's Turn (player is '${symbol}')`
              );
            }}
          />
        )}
      </div>
    </Page>
  );
};

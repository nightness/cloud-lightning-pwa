import { useEffect, useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Block, BlockType, OrientationValue } from ".";
import useInterval from "../hooks/useInterval";
import {
  Board,
  createNewBoard,
  randomBlock,
  copyBoard,
  minmax,
  getBlockHeight,
  getBlockWidth,
  createBlockPattern,
  getBoardSubset,
} from "./TetrisSupport";

export default function TetrisBoard() {
  const BLOCK_SIZE = 25; // Pixels
  const [board, setBoard] = useState<Board>(createNewBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockType>(
    randomBlock()
  );
  const [blockLocation, setBlockLocation] = useState({ row: 0, column: 4 }); // [row, column]
  const [orientation, setOrientation] = useState<OrientationValue>(0);
  const [isStarted, setIsStarted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const newBlock = () => {
    setCurrentBlockType(randomBlock());
    setOrientation(0);
    setBlockLocation({ row: 0, column: 1 + Math.floor(Math.random() * 6) });
  };

  const placeOnBoard = (row: number, column: number) => {
    const newBoard = copyBoard(board);
    //console.log("Place Block :", currentBlockType, orientation, row, column);

    const blockMap: Board = createBlockPattern(currentBlockType, orientation);
    // Now "map" the change on to the board
    blockMap.map((arrayValue, index, array) => {
      const map = arrayValue.map(
        (map, idx) => blockMap[index][idx] || board[row + index][column + idx]
      );
      return newBoard[row + index].splice(column, map.length, ...map);
    });

    // Find out which row need removing
    const removeRows = [] as number[];
    newBoard.forEach((row, index) => {
      let isFull = true;
      row.map((block) => {
        if (block === 0) isFull = false;
      });
      if (isFull) removeRows.push(index);
    });

    // Remove those rows
    removeRows.forEach((rowIndex, index) => {
      newBoard.splice(rowIndex - index, 1);
    });

    // Add the same number of new rows at the top of the board
    for (let i = 0; i < removeRows.length; i++) {
      const row = Array(10).fill(0);
      newBoard.unshift(row);
    }

    setBoard(newBoard);
    newBlock();
  };

  // Stops the game and clears rows when ever the board changes
  useEffect(() => {
    const topRow = board[0];
    topRow.forEach((cell) => {
      if (cell !== 0) {
        setIsStarted(false);
        console.log("Stopped gamed; pieces on top line");
        return;
      }
    });
  }, [board]);

  const willBlockImpact = (
    row: number,
    column: number,
    blockOrientation: OrientationValue = orientation
  ) => {
    const height = getBlockHeight(currentBlockType, orientation);
    let endOfBoard = row > 20 - height;
    let impact = endOfBoard;

    if (endOfBoard) console.log("endOfBoard detection");

    if (!impact) {
      const blockMap = createBlockPattern(currentBlockType, blockOrientation);
      const boardMap = getBoardSubset(board, row, column, [
        blockMap.length,
        blockMap[0].length,
      ]);
      const impactMap = boardMap.map((value, index, array) =>
        value.map((map, idx) =>
          blockMap[index][idx] && board[row + index][column + idx] ? 1 : 0
        )
      );
      impactMap.forEach((r, rIndex, rArray) => {
        r.forEach((block) => {
          if (block !== 0) impact = true;
        });
      });

      if (impact) console.log("impactMap", impactMap);
    }
    return impact;
  };

  useInterval(() => {
    if (!isStarted || isPaused) return;
    // Drop the block by one
    const row = blockLocation.row + 1;
    const column = blockLocation.column;

    if (willBlockImpact(row, column)) {
      placeOnBoard(blockLocation.row, blockLocation.column);
      return;
    }
    setBlockLocation({ row, column });
  }, 1000);

  const handleReset = () => {
    setIsStarted(true);
    setIsPaused(false);
    setBoard(createNewBoard());
    newBlock();
  };

  const handlePause = () => {
    setIsPaused((val) => !val);
  };

  const handleRotate = () => {
    if (isPaused || !isStarted) return;
    const newOrientation =
      orientation === 0
        ? 90
        : orientation === 90
        ? 180
        : orientation === 180
        ? 270
        : 0;

    let row = minmax(
      blockLocation.row,
      0,
      19 - getBlockWidth(currentBlockType, orientation)
    );
    let column = minmax(
      blockLocation.column,
      0,
      9 - getBlockHeight(currentBlockType, orientation)
    );

    if (!willBlockImpact(row, column, newOrientation)) {
      setBlockLocation({ row, column });
      setOrientation(newOrientation);
    }
  };

  const handleHorizontalMove = (key: string) => {
    if (isPaused || !isStarted) return;
    const offset = key === "LEFT" ? -1 : 1;
    const row = blockLocation.row;
    const column = minmax(
      blockLocation.column + offset,
      0,
      10 - getBlockWidth(currentBlockType, orientation)
    );

    if (!willBlockImpact(row, column)) {
      setBlockLocation({ row, column });
    }
  };

  const handleVerticalMove = (key: string) => {
    if (isPaused || !isStarted) return;
    if (key == "UP") {
      setBlockLocation({ row: 0, column: blockLocation.column });
      return;
    }
    const row = minmax(
      blockLocation.row + 1,
      0,
      20 - getBlockHeight(currentBlockType, orientation)
    );
    const column = blockLocation.column;

    if (!willBlockImpact(row, column)) {
      setBlockLocation({ row, column });
    }
  };

  const handleChangeBlockType = (key: string) => {
    if (isPaused || !isStarted) return;
    setCurrentBlockType(key === "X" ? "X!" : (key as BlockType));
  };

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={handleHorizontalMove}
      />
      <KeyboardEventHandler
        handleKeys={["UP", "DOWN"]}
        onKeyEvent={handleVerticalMove}
      />
      <KeyboardEventHandler handleKeys={["SPACE"]} onKeyEvent={handleRotate} />
      <KeyboardEventHandler handleKeys={["R"]} onKeyEvent={handleReset} />
      <KeyboardEventHandler handleKeys={["P"]} onKeyEvent={handlePause} />
      <KeyboardEventHandler
        handleKeys={["I", "J", "L", "O", "S", "T", "Z", "X"]}
        onKeyEvent={handleChangeBlockType}
      />
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
              />
            ))}
          </div>
        ))}
        {currentBlockType ? (
          <Block
            blockType={currentBlockType}
            orientation={orientation}
            style={{
              position: "absolute",
              top: blockLocation.row * BLOCK_SIZE,
              left: blockLocation.column * BLOCK_SIZE,
            }}
          />
        ) : undefined}
      </div>
    </div>
  );
}

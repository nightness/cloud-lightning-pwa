import { useEffect, useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { array } from "yup/lib/locale";
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
    setBlockLocation({ row: 0, column: 3 });
  };

  const placeOnBoard = (row: number, column: number) => {
    const newBoard = copyBoard(board);
    console.log("Place Block :", currentBlockType, orientation, row, column);

    const blockMap: Board = createBlockPattern(currentBlockType, orientation);
    // Now "map" the change on to the board
    blockMap.map((arrayValue, index, array) => {
      const map = arrayValue.map(
        (map, idx) => blockMap[index][idx] || board[row + index][column + idx]
      );
      return newBoard[row + index].splice(
        column,
        map.length,
        ...map
      );
    });
    setBoard(newBoard);
    newBlock();
  };

  // Stops the game
  useEffect(() => {
    const topRow = board[0];
    topRow.forEach((cell) => {
      if (cell !== 0) {
        setIsStarted(false);
        console.log("Stopped gamed; pieces on top line");
      }
    });
  }, [board]);

  useInterval(() => {
    if (!isStarted || isPaused) return;
    // Drop the block by one
    const height = getBlockHeight(currentBlockType, orientation);
    const newOffset = minmax(blockLocation.row + 1, 0, 20 - height);
    let endOfBoard = newOffset >= 20 - height;
    let impact = endOfBoard;
    if (!impact) {
        const blockMap = createBlockPattern(currentBlockType, orientation);
        const boardMap = getBoardSubset(
          board,
          newOffset,
          blockLocation.column,
          [blockMap.length, blockMap[0].length]
        );
        const impactMap = boardMap.map((value, index, array) =>
          value.map((map, idx) =>
            blockMap[index][idx] &&
            board[newOffset + index][blockLocation.column + idx]
              ? 1
              : 0
          )
        );
        impactMap.forEach((r, rIndex, rArray) => {
          r.forEach((block) => {
            if (block !== 0) impact = true;
          });
        });

        if (impact) console.log("impactMap", impactMap);
    }

    if (endOfBoard) console.log("endOfBoard detection");

    if (impact) {
      placeOnBoard(newOffset - (endOfBoard ? 0 : 1), blockLocation.column);
      return;
    }
    setBlockLocation({ row: newOffset, column: blockLocation.column });
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
    const newOrientation =
      orientation === 0
        ? 90
        : orientation === 90
        ? 180
        : orientation === 180
        ? 270
        : 0;

    const row = minmax(
      blockLocation.row,
      0,
      20 - getBlockWidth(currentBlockType, newOrientation)
    );
    const column = minmax(
      blockLocation.column,
      0,
      10 - getBlockHeight(currentBlockType, newOrientation)
    );

    setBlockLocation({ row, column });
    setOrientation(newOrientation);
  };

  const handleHorizontalMove = (key: string) => {
    setBlockLocation({
      row: blockLocation.row,
      column: minmax(
        blockLocation.column + (key === "LEFT" ? -1 : 1),
        0,
        10 - getBlockWidth(currentBlockType, orientation)
      ),
    });
  };

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={handleHorizontalMove}
      />
      <KeyboardEventHandler
        handleKeys={["UP", "DOWN"]}
        onKeyEvent={(key, e) =>
          setBlockLocation({
            row: minmax(
              key === "DOWN" ? blockLocation.row + 1 : 0,
              0,
              20 - getBlockHeight(currentBlockType, orientation)
            ),
            column: blockLocation.column,
          })
        }
      />
      <KeyboardEventHandler handleKeys={["SPACE"]} onKeyEvent={handleRotate} />
      <KeyboardEventHandler handleKeys={["R"]} onKeyEvent={handleReset} />
      <KeyboardEventHandler handleKeys={["P"]} onKeyEvent={handlePause} />
      <KeyboardEventHandler
        handleKeys={["I", "J", "L", "O", "S", "T", "Z", "X"]}
        onKeyEvent={(key, e) => {
          setCurrentBlockType(key === "X" ? "X!" : (key as BlockType));
        }}
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

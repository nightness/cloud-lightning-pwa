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
  const [currentBlockType, setCurrentBlockType] = useState<BlockType>("O");
  const [blockLocation, setBlockLocation] = useState({ row: 0, column: 4 }); // [row, column]
  const [orientation, setOrientation] = useState<OrientationValue>(0);
  const [isStarted, setIsStarted] = useState(true);

  const newBlock = () => {
    setCurrentBlockType(randomBlock());
    setOrientation(0);
    setBlockLocation({ row: 0, column: 3 });
  };

  const placeOnBoard = (endOfBoard: boolean) => {
    const newBoard = copyBoard(board);
    console.log(
      "Place Block :",
      currentBlockType,
      orientation,
      blockLocation.row,
      blockLocation.column
    );
    const blockMap: Board = createBlockPattern(currentBlockType, orientation);
    // Now "map" the change on to the board
    blockMap.map((arrayValue, index, array) => {
      const map = arrayValue.map(
        (map, idx) =>
          blockMap[index][idx] ||
          board[blockLocation.row + index][blockLocation.column + idx]
      );
      return newBoard[blockLocation.row + index + (endOfBoard ? 1 : 0)].splice(
        blockLocation.column,
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
    if (!isStarted) return;
    // Drop the block by one
    const height = getBlockHeight(currentBlockType, orientation);
    const newOffset = minmax(blockLocation.row + 1, 0, 20 - height);
    const endOfBoard = newOffset >= 20 - height;
    let impact = endOfBoard;
    if (!impact) {
      const blockMap = createBlockPattern(currentBlockType, orientation);
      const boardMap = getBoardSubset(
        board,
        blockLocation.row + 1,
        blockLocation.column,
        [blockMap.length, blockMap[0].length]
      );
      boardMap.forEach((r, rIndex, rArray) => {
        r.forEach((block) => {
          if (block !== 0) impact = true;
        });
      });
    }
    if (impact) {
      placeOnBoard(endOfBoard);
      return;
    }
    setBlockLocation({ row: newOffset, column: blockLocation.column });
  }, 1000);

  const handleReset = () => {
    setIsStarted(true);
    setBoard(createNewBoard());
    newBlock();
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
      1,
      20 - getBlockWidth(currentBlockType, newOrientation)
    );
    const column = minmax(
      blockLocation.column,
      1,
      10 - getBlockHeight(currentBlockType, newOrientation)
    );

    setBlockLocation({ row, column });
    setOrientation(newOrientation);
  };

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={(key, e) =>
          setBlockLocation({
            row: blockLocation.row,
            column: minmax(
              blockLocation.column + (key === "LEFT" ? -1 : 1),
              0,
              10 - getBlockWidth(currentBlockType, orientation)
            ),
          })
        }
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

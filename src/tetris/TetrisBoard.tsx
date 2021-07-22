import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Block, BlockType, OrientationValue } from ".";
import useInterval from "../hooks/useInterval";
import {
  Board,
  getEmptyBoard,
  randomBlock,
  copyBoard,
  minmax,
  getBlockHeight,
  getBlockWidth,
  createBlockPattern,
} from "./TetrisSupport";

export default function TetrisBoard() {
  const BLOCK_SIZE = 25; // Pixels
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockType>("O");
  const [blockLocation, setBlockLocation] = useState([0, 4]); // [Height, Width]
  const [orientation, setOrientation] = useState<OrientationValue>(0);
  const [isStarted, setIsStarted] = useState(true);

  const newBlock = () => {
    setCurrentBlockType(randomBlock());
    setOrientation(0);
    setBlockLocation([0, 3]);
  };

  const placeOnBoard = () => {
    const newBoard = copyBoard(board);
    console.log(
      "Place Block :",
      currentBlockType,
      orientation,
      blockLocation[0],
      blockLocation[1]
    );
    const blockMap: Board = createBlockPattern(currentBlockType, orientation);
    // Now "map" the change on to the board
    blockMap.map((arrayValue, index, array) => {
      const map = blockMap[index].map((map, idx) => blockMap[index][idx] || array[index][idx])
      return newBoard[blockLocation[0] + index].splice(
        blockMap[index].length,
        blockMap[index].length, 
        ...map
      );
    });
    setBoard(newBoard);
    newBlock();
  };

  useInterval(() => {
    if (!isStarted) return;
    const newOffset = minmax(
      blockLocation[0] + 1,
      0,
      20 - getBlockHeight(currentBlockType, orientation)
    );
    if (newOffset === blockLocation[0]) {
      placeOnBoard();
      return;
    }
    // Need to check that each box in the block is no touching any
    // non-zero board value
    if (board[newOffset + 1][blockLocation[1]] === 0)
      setBlockLocation([newOffset, blockLocation[1]]);
    else placeOnBoard();
  }, 1000);

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={(key, e) =>
          setBlockLocation([
            blockLocation[0],
            minmax(
              blockLocation[1] + (key === "LEFT" ? -1 : 1),
              0,
              10 - getBlockWidth(currentBlockType, orientation)
            ),
          ])
        }
      />
      <KeyboardEventHandler
        handleKeys={["UP", "DOWN"]}
        onKeyEvent={(key, e) =>
          setBlockLocation([
            key === "UP"
              ? 0
              : 20 - getBlockHeight(currentBlockType, orientation),
            blockLocation[1],
          ])
        }
      />
      <KeyboardEventHandler
        handleKeys={["SPACE"]}
        onKeyEvent={(key, e) => {
          const newOrientation =
            orientation === 0
              ? 90
              : orientation === 90
              ? 180
              : orientation === 180
              ? 270
              : 0;

          const height = minmax(
            blockLocation[0],
            0,
            19 - getBlockHeight(currentBlockType, newOrientation)
          );
          const width = minmax(
            blockLocation[1],
            0,
            9 - getBlockWidth(currentBlockType, newOrientation)
          );

          setBlockLocation([height, width]);
          setOrientation(newOrientation);
        }}
      />
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
              top: blockLocation[0] * BLOCK_SIZE,
              left: blockLocation[1] * BLOCK_SIZE,
            }}
          />
        ) : undefined}
      </div>
    </div>
  );
}

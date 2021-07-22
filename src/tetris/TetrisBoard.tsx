import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Block, BlockType, OrientationValue } from ".";
import useInterval from "../hooks/useInterval";

type Board = number[][];

const getEmptyBoard = () => {
  const board = Array(20)
    .fill(0)
    .map((x) => Array(10).fill(0));
  return board as Board;
};

const copyBoard = (board: Board) => {
  return board.map((arr) => arr.slice());
};

const getBlockWidth = (blockType: BlockType, orientation: OrientationValue) => {
  if (
    (blockType === "J" || blockType === "T") &&
    (orientation === 90 || orientation === 270)
  )
    return 2;
  if (blockType === "I" && (orientation === 90 || orientation === 270))
    return 1;
  if (blockType === "I") return 4;
  if (
    (blockType === "Z" || blockType === "S") &&
    (orientation === 90 || orientation === 270)
  )
    return 2;
  if (blockType === "O") return 2;
  if (blockType === "T" && (orientation === 90 || orientation === 270))
    return 2;
  return 3;
};

const getBlockHeight = (
  blockType: BlockType,
  orientation: OrientationValue
) => {
  if (
    (blockType === "J" || blockType === "L") &&
    (orientation === 0 || orientation === 180)
  )
    return 2;
  if (blockType === "I" && (orientation === 0 || orientation === 180)) return 1;
  if (blockType === "I") return 4;
  if (
    (blockType === "Z" || blockType === "S") &&
    (orientation === 0 || orientation === 180)
  )
    return 2;
  if (blockType === "O") return 2;
  if (blockType === "T" && (orientation === 0 || orientation === 180)) return 2;
  return 3;
};

const randomBlock = () => {
  const blocks: BlockType[] = ["I", "J", "L", "O", "S", "T", "Z", "X!"];
  return blocks[Math.floor(Math.random() * 8)];
};

const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function TetrisBoard() {
  const BLOCK_SIZE = 25; // Pixels
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockType>("O");
  const [blockLocation, setBlockLocation] = useState([0, 4]); // [Height, Width]
  // const [verticalOffset, setVerticalOffset] = useState(0);
  // const [horizontalOffset, setHorizontalOffset] = useState(0);
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
    newBoard[19][9] = 1;
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
    setBlockLocation([newOffset, blockLocation[1]]);
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
              9 - getBlockWidth(currentBlockType, orientation)
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

          const width = minmax(
            blockLocation[1] + getBlockWidth(currentBlockType, newOrientation),
            0,
            9
          );
          const height = minmax(
            blockLocation[0] + getBlockHeight(currentBlockType, newOrientation),
            0,
            19
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
              top: blockLocation[0] * 25,
              left: blockLocation[1] * 25,
            }}
          />
        ) : undefined}
      </div>
    </div>
  );
}

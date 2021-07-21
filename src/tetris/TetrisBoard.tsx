import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Block, BlockTypes, OrientationValue } from ".";
import useInterval from "../hooks/useInterval";

type Board = number[][];

const getEmptyBoard = () => {
  const board = Array(20)
    .fill(0)
    .map((x) => Array(10).fill(0));
  return board as Board;
};

const getBlockWidth = (
  blockType: BlockTypes,
  orientation: OrientationValue
) => {
  if (
    (blockType === "J" || blockType === "T") &&
    (orientation === 90 || orientation === 270)
  )
    return 2;
  if (blockType === "I" && (orientation === 90 || orientation === 270))
    return 1;
  if (blockType === "I") return 4;
  if ((blockType === 'Z' || blockType === 'S') && (orientation === 90 || orientation === 270)) return 2;
  if (blockType === "O") return 2;
  if (blockType === "T" && (orientation === 90 || orientation === 270))
    return 2;
  return 3;
};

const getBlockHeight = (
  blockType: BlockTypes,
  orientation: OrientationValue
) => {
  if (
    (blockType === "J" || blockType === "L") &&
    (orientation === 0 || orientation === 180)
  )
    return 2;
  if (blockType === "I" && (orientation === 0 || orientation === 180)) return 1;
  if (blockType === "I") return 4;
  if ((blockType === 'Z' || blockType === 'S') && (orientation === 0 || orientation === 180)) return 2;
  if (blockType === "O") return 2;
  if (blockType === "T" && (orientation === 0 || orientation === 180)) return 2;
  return 3;
};

export default function TetrisBoard() {
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockTypes>("O");
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [orientation, setOrientation] = useState<OrientationValue>(0);
  const [isStarted, setIsStarted] = useState(true);

  useInterval(() => {
    if (!isStarted) return
    setVerticalOffset(
      Math.min(
        Math.max(verticalOffset + 25, 0),
        500 - getBlockHeight(currentBlockType, orientation) * 25
      ))
  }, 1000)

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={(key, e) =>
          setHorizontalOffset(
            Math.min(
              Math.max(horizontalOffset + (key === "LEFT" ? -25 : 25), 0),
              250 - getBlockWidth(currentBlockType, orientation) * 25
            )
          )
        }
      />
      <KeyboardEventHandler
        handleKeys={["UP", "DOWN"]}
        onKeyEvent={(key, e) =>
          setVerticalOffset(
            Math.min(
              Math.max(verticalOffset + (key === "UP" ? -25 : 25), 0),
              500 - getBlockHeight(currentBlockType, orientation) * 25
            )
          )
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

          const blockWidth = getBlockWidth(currentBlockType, newOrientation);
          const blockHeight = getBlockHeight(currentBlockType, newOrientation);

          if (verticalOffset + blockHeight * 25 > 500)
            setVerticalOffset(500 - blockHeight * 25);

          if (horizontalOffset + blockWidth * 25 > 250)
            setHorizontalOffset(250 - blockWidth * 25);

          setOrientation(newOrientation);
        }}
      />
      <KeyboardEventHandler
        handleKeys={["I", "J", "L", "O", "S", "T", "Z", "X"]}
        onKeyEvent={(key, e) => {
          setCurrentBlockType(key === "X" ? "XO" : (key as BlockTypes));
        }}
      />
      <div className="tetris-board-inner">
        {board?.map((value) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
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
              top: verticalOffset,
              left: horizontalOffset,
            }}
            key={`${Math.random()}`}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

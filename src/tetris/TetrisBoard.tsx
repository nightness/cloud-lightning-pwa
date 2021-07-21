import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Block, BlockTypes, OrientationValue } from ".";

type Board = number[][];

const getEmptyBoard = () => {
  const board = Array(20)
    .fill(0)
    .map((x) => Array(10).fill(0));
  return board as Board;
};

export default function TetrisBoard() {
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockTypes>("T");
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [orientation, setOrientation] = useState<OrientationValue>(0);

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={(key, e) =>
          setHorizontalOffset(horizontalOffset + (key === "LEFT" ? -25 : 25))
        }
      />
      <KeyboardEventHandler
        handleKeys={["UP", "DOWN"]}
        onKeyEvent={(key, e) =>
          setVerticalOffset(verticalOffset + (key === "UP" ? -25 : 25))
        }
      />
      <KeyboardEventHandler
        handleKeys={["SPACE"]}
        onKeyEvent={(key, e) => {
          if (orientation === 0) setOrientation(90);
          if (orientation === 90) setOrientation(180);
          if (orientation === 180) setOrientation(270);
          if (orientation === 270) setOrientation(0);
        }}
      />
      <KeyboardEventHandler
        handleKeys={["I", "J", "L", "O", "S", "T", "Z", "X"]}
        onKeyEvent={(key, e) => {
          setCurrentBlockType(key as BlockTypes)
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
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

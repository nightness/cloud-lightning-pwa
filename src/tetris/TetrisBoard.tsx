import { FLEX_EXPANDER } from "@blueprintjs/core/lib/esm/common/classes";
import { useState } from "react";

type Board = number[][];

const getEmptyBoard = () => {
  const board = Array(20)
    .fill(0)
    .map((x) => Array(10).fill(0));
  return board as number[][];
};

export default function TetrisBoard() {
  const [board, setBoard] = useState<Board>(getEmptyBoard());

  return (
    <div className="tetris-board">
      <div className="tetris-board-inner">
        {board?.map((value) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {value.map((v) => (
              <div className={`board-block board-block-${v}`}>{}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

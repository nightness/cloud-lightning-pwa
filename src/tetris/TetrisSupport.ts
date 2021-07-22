import { BlockType, OrientationValue } from ".";

export type Board = number[][];
export type Size = [number, number];
export type Location = {
  row: number,
  column: number
}

export const createNewBoard = (height: number = 20, width: number = 10) => {
  const board = Array(height)
    .fill(0)
    .map((x) => Array(width).fill(0));
  return board as Board;
};

export const copyBoard = (board: Board) => {
  return board.map((arr) => arr.slice());
};

export const wouldOccupySameSpace = (board: Board, block: Board, blockRow: number, blockColumn: number) => {
  for (let b = blockRow; b < blockColumn; b++ ) {
    const first = board[b]
  }
}

export const getBoardSubset = (
  board: Board,
  row: number,
  column: number,
  size: Size
) => {
  const results = createNewBoard(size[0], size[1]);
  for (let i = 0; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      //console.log("Test: ", board[column + c][row + r], column, row, c, r)
      results[i][j] = board[row + i][column + j];
    }
  }
  return results;
};

export const getBlockWidth = (
  blockType: BlockType,
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

export const getBlockHeight = (
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

export const createBlockPattern = (
  blockType: BlockType,
  orientation: OrientationValue
) => {
  if (blockType === "I") {
    const map: Board =
      orientation === 0 || orientation === 180
        ? [[1, 1, 1, 1]]
        : [[1], [1], [1], [1]];
    return map;
  }
  if (blockType === "T") {
    const map: Board =
      orientation === 0
        ? [
            [1, 1, 1],
            [0, 1, 0],
          ]
        : orientation === 90
        ? [
            [0, 1],
            [1, 1],
            [0, 1],
          ]
        : orientation === 180
        ? [
            [0, 1, 0],
            [1, 1, 1],
          ]
        : [
            // orientation === 270
            [1, 0],
            [1, 1],
            [1, 0],
          ];
    return map;
  }

  if (blockType === "L") {
    const map: Board =
      orientation === 0
        ? [
            [1, 1, 1],
            [1, 0, 0],
          ]
        : orientation === 90
        ? [
            [1, 1],
            [0, 1],
            [0, 1],
          ]
        : orientation === 180
        ? [
            [0, 0, 1],
            [1, 1, 1],
          ]
        : [
            // orientation === 270
            [1, 0],
            [1, 0],
            [1, 1],
          ];
    return map;
  }

  if (blockType === "J") {
    const map: Board =
      orientation === 0
        ? [
            [1, 0, 0],
            [1, 1, 1],
          ]
        : orientation === 90
        ? [
            [1, 1],
            [1, 0],
            [1, 0],
          ]
        : orientation === 180
        ? [
            [1, 1, 1],
            [0, 0, 1],
          ]
        : [
            // orientation === 270
            [0, 1],
            [0, 1],
            [1, 1],
          ];
    return map;
  }

  if (blockType === "O") {
    const map: Board = [
      [1, 1],
      [1, 1],
    ];
    return map;
  }

  if (blockType === "S") {
    const map: Board =
      orientation === 0 || orientation == 180
        ? [
            [0, 1, 1],
            [1, 1, 0],
          ]
        : [
            // Orientation of 90 or 270
            [1, 0],
            [1, 1],
            [0, 1],
          ];
    return map;
  }

  if (blockType === "Z") {
    const map: Board =
      orientation === 0 || orientation == 180
        ? [
            [1, 1, 0],
            [0, 1, 1],
          ]
        : [
            // Orientation of 90 or 270
            [0, 1],
            [1, 1],
            [1, 0],
          ];
    return map;
  }

  if (blockType === "X!") {
    const map: Board =
      orientation === 0 || orientation == 180
        ? [
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1],
          ]
        : [
            // Orientation of 90 or 270
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0],
          ];
    return map;
  }

  throw new Error("missing blockType");
  return [[]] as Board;
};

export const randomBlock = () => {
  const blocks: BlockType[] = ["I", "J", "L", "O", "S", "T", "Z", "X!"];
  return blocks[Math.floor(Math.random() * 8)];
};

export const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

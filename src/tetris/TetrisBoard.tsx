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

interface Props {
  devMode?: boolean;
  increaseSpeedAfter: number; // after... number of rows removed
  enable8thPiece?: boolean;
  onStartedChanged?: (isStarted: boolean) => any;
  onRowsRemoved?: (numberOfRowsRemoved: number) => any;
}

export default function TetrisBoard({
  devMode,
  increaseSpeedAfter,
  enable8thPiece,
  onStartedChanged,
  onRowsRemoved,
}: Props) {
  const BLOCK_SIZE = 25; // Pixels
  const STARTING_SPEED = 1000; // ms
  const SPEED_INCREASE_RATE = 30; // ms
  const FASTEST_RATE = 100; // down by one per 100ms
  const [board, setBoard] = useState<Board>(createNewBoard());
  const [currentBlockType, setCurrentBlockType] = useState<BlockType>(
    randomBlock(!enable8thPiece)
  );
  const [blockLocation, setBlockLocation] = useState({ row: 0, column: 4 }); // [row, column]
  const [orientation, setOrientation] = useState<OrientationValue>(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(STARTING_SPEED);

  const newBlock = () => {
    setCurrentBlockType(randomBlock(!enable8thPiece));
    setOrientation(0);
    setBlockLocation({ row: 0, column: 1 + Math.floor(Math.random() * 6) });
  };

  const placeOnBoard = (row: number, column: number) => {
    const newBoard = copyBoard(board);
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
      if (isFull) {
        removeRows.push(index);
        const total = rowsRemoved + removeRows.length;
        setRowsRemoved(total);
        onRowsRemoved?.(removeRows.length);
        const speed = Math.min(
          STARTING_SPEED - (total / increaseSpeedAfter) * SPEED_INCREASE_RATE,
          FASTEST_RATE
        );
        if (speed != gameSpeed) {
          setGameSpeed(speed);
          // onGameSpeedChange
        }
      }
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
    let wasStopped = false;
    topRow.forEach((cell) => {
      if (cell !== 0) {
        setIsStarted(false);
        wasStopped = true;
      }
    });
    if (wasStopped)
      console.log("Stopped gamed; the last block was placed on top row");
  }, [board]);

  useEffect(() => {
    onStartedChanged?.(isStarted);
  }, [isStarted]);

  // Will the current block impact a filled in part of the board,
  // given the parameters supplied.
  const willBlockImpact = (
    row: number,
    column: number,
    blockOrientation: OrientationValue = orientation
  ) => {
    const height = getBlockHeight(currentBlockType, blockOrientation);
    const width = getBlockWidth(currentBlockType, blockOrientation);
    let endOfBoard = row > 20 - height || column < 0 || column > 10 - width;
    let impact = endOfBoard; // Block would be off the board, so impact is true

    // If not endOfBoard, and check the board for impacts with filled in squares
    if (!impact) {
      // A 2D array of a block
      const blockMap = createBlockPattern(currentBlockType, blockOrientation);

      // A 2D subset of the board, same size as blockMap for comparison
      const boardMap = getBoardSubset(board, row, column, [
        blockMap.length,
        blockMap[0].length,
      ]);

      // Builds a same sized 2D array of 0 or 1, 1 indicates an impact
      const impactMap = boardMap.map((value, index, array) =>
        value.map((map, idx) =>
          blockMap[index][idx] && board[row + index][column + idx] ? 1 : 0
        )
      );

      // If there are any impacts in the impactMap, set impact = true
      impactMap.forEach((r, rIndex, rArray) => {
        r.forEach((block) => {
          if (block !== 0) impact = true;
        });
      });
    }
    return impact;
  };

  useInterval(() => {
    if (!isStarted || isPaused) return;
    // Drop the block by one
    const row = blockLocation.row + 1;
    const column = blockLocation.column;

    // If a move would cause an impact, place the current piece on
    // the board (in it's current location).
    if (willBlockImpact(row, column)) {
      placeOnBoard(blockLocation.row, blockLocation.column);
      return;
    }

    // Move the Block
    setBlockLocation({ row, column });
  }, gameSpeed);

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

    // Rotates 'I' from "the middle", not the top
    let columnOffset =
      currentBlockType !== "I"
        ? 0
        : newOrientation === 0
        ? -1
        : newOrientation === 90
        ? 1
        : newOrientation === 180
        ? -2
        : newOrientation === 270
        ? 2
        : 0;

    let row = minmax(
      blockLocation.row,
      0,
      20 - getBlockWidth(currentBlockType, orientation)
    );
    let column = minmax(
      blockLocation.column + columnOffset,
      0,
      10 - getBlockHeight(currentBlockType, orientation)
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
    const column = blockLocation.column + offset;

    if (!willBlockImpact(row, column)) {
      setBlockLocation({ row, column });
    }
  };

  const handleVerticalMove = (key: string) => {
    if (isPaused || !isStarted) return;
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
    if (isPaused || !isStarted || !devMode) return;
    setCurrentBlockType(key === "X" ? "X!" : (key as BlockType));
  };

  return (
    <div className="tetris-board">
      <KeyboardEventHandler
        handleKeys={["LEFT", "RIGHT"]}
        onKeyEvent={handleHorizontalMove}
      />
      <KeyboardEventHandler
        handleKeys={["DOWN"]}
        onKeyEvent={handleVerticalMove}
      />
      <KeyboardEventHandler
        handleKeys={["SPACE", "UP"]}
        onKeyEvent={handleRotate}
      />
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
        {currentBlockType && isStarted ? (
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

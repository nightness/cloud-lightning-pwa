import "./index.css";
import I from "./blocks/I";
import J from "./blocks/J";
import L from "./blocks/L";
import O from "./blocks/O";
import S from "./blocks/S";
import T from "./blocks/T";
import Z from "./blocks/Z";
import XO from "./blocks/XO";
import TestPanel from "./TestPanel";
import Tetris from "./TetrisPage";
import TetrisBoard from "./TetrisBoard";
import Block, { BlockProps, BlockType, OrientationValue } from "./blocks/Block";

export { Block, Tetris, TetrisBoard, TestPanel };
export { I, J, L, O, S, T, Z, XO };

export type Plane = number[][];
export type Size = [number, number];
export type Location = {
  row: number;
  column: number;
};

export type { BlockProps, BlockType, OrientationValue };

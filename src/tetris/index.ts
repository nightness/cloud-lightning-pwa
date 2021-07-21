import './index.css'
import I from './blocks/I'
import J from './blocks/J'
import L from './blocks/L'
import O from './blocks/O'
import S from './blocks/S'
import T from './blocks/T'
import Z from './blocks/Z'
import TestPanel from "./TestPanel";
import Tetris from "./Tetris";
import TetrisBoard from "./TetrisBoard";
import Block, { BlockProps, BlockTypes, OrientationValue } from "./blocks/Block"

export { Block, Tetris, TetrisBoard, TestPanel };
export { I, J, L, O, S, T, Z }

export type { BlockProps, BlockTypes, OrientationValue }
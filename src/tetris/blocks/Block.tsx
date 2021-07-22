import { CSSProperties } from "react";

import { I, J, L, O, S, T, Z, XO } from "..";
export type BlockTypes = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | 'X!';
export type OrientationValue = 0 | 90 | 180 | 270;

export interface BlockProps {
  
  orientation: OrientationValue;
  style?: CSSProperties;
}

export interface Props extends BlockProps {
  blockType: BlockTypes;
}

export default ({ blockType, style, orientation }: Props) => {
  if (blockType === "X!") return <XO style={style} orientation={orientation} />;
  if (blockType === "I") return <I style={style} orientation={orientation} />;
  if (blockType === "J") return <J style={style} orientation={orientation} />;
  if (blockType === "L") return <L style={style} orientation={orientation} />;
  if (blockType === "O") return <O style={style} orientation={orientation} />;
  if (blockType === "S") return <S style={style} orientation={orientation} />;
  if (blockType === "T") return <T style={style} orientation={orientation} />;
  return <Z style={style} orientation={orientation} />;
};

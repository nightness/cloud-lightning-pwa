import { CSSProperties } from "react";

export interface BlockProps {
  orientation: 0 | 90 | 180 | 270;
  style?: CSSProperties;
}

export type Block = (props: BlockProps) => JSX.Element

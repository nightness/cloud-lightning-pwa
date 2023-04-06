import { CSSProperties } from "react";

import { I, J, L, O, S, T, Z, XO } from "..";
import { Plane } from "..";
export type BlockType = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | "X!";
export type OrientationValue = 0 | 90 | 180 | 270;

export interface BlockProps {
  orientation: OrientationValue;
  style?: CSSProperties;
}

export interface Props extends BlockProps {
  blockType: BlockType;
}

export const getBlockWidth = (
  blockType: BlockType,
  orientation: OrientationValue
) => {
  if (
    (blockType === "J" ||
      blockType === "T" ||
      blockType === "L" ||
      blockType === "Z" ||
      blockType === "S") &&
    (orientation === 90 || orientation === 270)
  )
    return 2;
  if (blockType === "I" && (orientation === 90 || orientation === 270))
    return 1;
  if (blockType === "I") return 4;
  if (blockType === "O") return 2;
  return 3;
};

export const getBlockHeight = (
  blockType: BlockType,
  orientation: OrientationValue
) => {
  if (
    (blockType === "J" ||
      blockType === "L" ||
      blockType === "T" ||
      blockType === "Z" ||
      blockType === "S") &&
    (orientation === 0 || orientation === 180)
  )
    return 2;
  if (blockType === "I" && (orientation === 0 || orientation === 180)) return 1;
  if (blockType === "I") return 4;
  if (blockType === "O") return 2;
  return 3;
};

export const createBlockPattern = (
  blockType: BlockType,
  orientation: OrientationValue
) => {
  if (blockType === "I") {
    const map: Plane =
      orientation === 0 || orientation === 180
        ? [[1, 1, 1, 1]]
        : [[1], [1], [1], [1]];
    return map;
  }
  if (blockType === "T") {
    const map: Plane =
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
    const map: Plane =
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
    const map: Plane =
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
    const map: Plane = [
      [1, 1],
      [1, 1],
    ];
    return map;
  }

  if (blockType === "S") {
    const map: Plane =
      orientation === 0 || orientation === 180
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
    const map: Plane =
      orientation === 0 || orientation === 180
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
    const map: Plane =
      orientation === 0 || orientation === 180
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
};

export const randomBlock = (disable8thBlock: boolean) => {
  const blocks: BlockType[] = ["I", "J", "L", "O", "S", "T", "Z", "X!"];
  return blocks[Math.floor(Math.random() * (disable8thBlock ? 7 : 7.1))];
};

function Block({ blockType, style, orientation }: Props) {
  if (blockType === "X!") return <XO style={style} orientation={orientation} />;
  if (blockType === "I") return <I style={style} orientation={orientation} />;
  if (blockType === "J") return <J style={style} orientation={orientation} />;
  if (blockType === "L") return <L style={style} orientation={orientation} />;
  if (blockType === "O") return <O style={style} orientation={orientation} />;
  if (blockType === "S") return <S style={style} orientation={orientation} />;
  if (blockType === "T") return <T style={style} orientation={orientation} />;
  return <Z style={style} orientation={orientation} />;
}
export default Block;

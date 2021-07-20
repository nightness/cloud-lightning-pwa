import React, { CSSProperties } from "react";

interface Props {
  orientation: 0 | 90 | 180 | 270;
  style?: CSSProperties;
}

export default function I({ style, orientation }: Props) {
  return (
    <div
      style={style}
      className={`${
        orientation === 0 || orientation == 180 ? "flex-column" : "flex-row"
      }`}
    >
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
    </div>
  );
}

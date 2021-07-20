import React from "react";
import { CSSProperties } from "styled-components";

interface Props {
  orientation: 0 | 90 | 180 | 270;
  style?: CSSProperties
}

export default function S({ style, orientation }: Props) {
  return (
    <div
      style={style}
      className={`${
        orientation === 0 || orientation === 180 ? "flex-column" : "flex-row"
      }`}
    >
      <div
        className={`${
          orientation === 0 || orientation === 180 ? "flex-row" : "flex-column-reverse"
        }`}
      >
        <div className="blank" />
        <div className="box" />
        <div className="box" />
      </div>
      <div
        className={`${
          orientation === 0 || orientation === 180 ? "flex-row" : "flex-column-reverse"
        }`}
      >
        <div className="box" />
        <div className="box" />
        <div className="blank" />
      </div>
    </div>
  );
}

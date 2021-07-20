import React, { CSSProperties } from "react";

interface Props {
  orientation: 0 | 90 | 180 | 270;
  style?: CSSProperties;
}

export default function O({ style, orientation }: Props) {
  return (
    <div style={style} className="flex-row">
      <div className="flex-column">
        <div className="box" />
        <div className="box" />
      </div>
      <div className="flex-column">
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
}

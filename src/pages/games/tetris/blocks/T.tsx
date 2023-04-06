import { BlockProps } from "..";

function T({ style, orientation }: BlockProps) {
  let outerClass = "flex-column";
  let innerClass = "flex-row";
  switch (orientation) {
    case 90:
      outerClass = "flex-row-reverse";
      innerClass = "flex-column";
      break;
    case 180:
      outerClass = "flex-column";
      innerClass = "flex-row";
      break;
    case 270:
      outerClass = "flex-row-reverse";
      innerClass = "flex-column-reverse";
      break;
  }

  return (
    <div style={style} className={outerClass}>
      <div className={innerClass}>
        <div
          className={`${
            orientation === 180 || orientation === 270
              ? "blank"
              : "box tetris-block-t"
          }`}
        />
        <div className="box tetris-block-t" />
        <div
          className={`${
            orientation === 180 || orientation === 270
              ? "blank"
              : "box tetris-block-t"
          }`}
        />
      </div>
      <div className={innerClass}>
        <div
          className={`${
            orientation === 0 || orientation === 90
              ? "blank"
              : "box tetris-block-t"
          }`}
        />
        <div className="box tetris-block-t" />
        <div
          className={`${
            orientation === 0 || orientation === 90
              ? "blank"
              : "box tetris-block-t"
          }`}
        />
      </div>
    </div>
  );
}

export default T;

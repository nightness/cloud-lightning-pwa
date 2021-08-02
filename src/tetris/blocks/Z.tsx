import { BlockProps } from "..";

export default ({ style, orientation }: BlockProps) => {
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
        <div className="box tetris-block-z" />
        <div className="box tetris-block-z" />
        <div className="blank" />
      </div>
      <div
        className={`${
          orientation === 0 || orientation === 180 ? "flex-row" : "flex-column-reverse"
        }`}
      >
        <div className="blank" />
        <div className="box tetris-block-z" />
        <div className="box tetris-block-z" />
      </div>
    </div>
  );
}

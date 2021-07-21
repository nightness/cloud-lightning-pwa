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

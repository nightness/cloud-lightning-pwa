import { BlockProps } from "./Block";

export default ({ style, orientation }: BlockProps) => {
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

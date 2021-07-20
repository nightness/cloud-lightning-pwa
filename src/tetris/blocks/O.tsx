import { BlockProps } from "..";

export default function O({ style, orientation }: BlockProps) {
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

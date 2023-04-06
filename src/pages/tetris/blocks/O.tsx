import { BlockProps } from "..";

function O({ style, orientation }: BlockProps) {
  return (
    <div style={style} className="flex-row">
      <div className="flex-column">
        <div className="box tetris-block-o" />
        <div className="box tetris-block-o" />
      </div>
      <div className="flex-column">
        <div className="box tetris-block-o" />
        <div className="box tetris-block-o" />
      </div>
    </div>
  );
}

export default O;

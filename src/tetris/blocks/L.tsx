import { BlockProps } from "..";

export default ({ style, orientation }: BlockProps) => {
  let outerClass = "flex-column";
  let innerClass = "flex-row";
  switch (orientation) {
    case 90:
      outerClass = "flex-row-reverse";
      innerClass = "flex-column";
      break;
    case 180:
      outerClass = "flex-column-reverse";
      innerClass = "flex-row-reverse";
      break;
    case 270:
      outerClass = "flex-row";
      innerClass = "flex-column-reverse";
      break;
  }

  return (
    <div style={style} className={outerClass}>
      <div className={innerClass}>
        <div className="box tetris-block-l" />
        <div className="box tetris-block-l" />
        <div className="box tetris-block-l" />
      </div>
      <div className={innerClass}>
        <div className={`${orientation === 0 || orientation === 90 ? 'box tetris-block-l' : 'empty'}`} />
        <div className="empty" />
        <div className={`${orientation === 180 || orientation === 270 ? 'box tetris-block-l' : 'empty'}`} />
      </div>
    </div>
  );
}

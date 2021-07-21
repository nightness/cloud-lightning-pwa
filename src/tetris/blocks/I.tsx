import { BlockProps } from "..";

export default ({ style, orientation }: BlockProps) => {
  let outerClass = "flex-column-reverse";
  let innerClass = "flex-row-reverse";
  switch (orientation) {
    case 90:
      outerClass = "flex-row-reverse";
      innerClass = "flex-column";
      break;
    case 270:
      outerClass = "flex-row";
      innerClass = "flex-column-reverse";
      break;
  }

  return (
    <div style={style} className={outerClass}>
      <div className={innerClass}>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
}

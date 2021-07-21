import { BlockProps } from "..";

export default ({ style, orientation }: BlockProps) => {
  let outerClass = "flex-column-reverse";
  let innerClass = "flex-row-reverse";
  switch (orientation) {
    case 90:
      outerClass = "flex-row-reverse";
      innerClass = "flex-column";
      break;
    // case 180:
    //   outerClass = "flex-column-reverse";
    //   innerClass = "flex-row-reverse";
    //   break;
    case 270:
      outerClass = "flex-row";
      innerClass = "flex-column-reverse";
      break;
  }

  return (
    <div style={style} className={outerClass}>
      {/* <div className={innerClass}>
        <div className="blank" />
        <div className="blank" />
        <div className="blank" />
        <div className="blank" />
      </div> */}
      <div className={innerClass}>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
}

import React, { CSSProperties } from "react";

interface Props {
  orientation: 0 | 90 | 180 | 270;
  style?: CSSProperties;
}

export default function J({ style, orientation }: Props) {
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
        <div className={`${orientation === 180 || orientation === 270 ? 'blank' : 'box'}`} />
        <div className='box' />
        <div className={`${orientation === 180 || orientation === 270 ? 'blank' : 'box'}`} />
      </div>
      <div className={innerClass}>
        <div className={`${orientation === 0 || orientation === 90 ? 'blank' : 'box'}`} />
        <div className='box' />
        <div className={`${orientation === 0 || orientation === 90 ? 'blank' : 'box'}`} />
      </div>
    </div>
  );
}

import React from "react";

interface Props {
    orientation: 0 | 90 | 180 | 270
}

export default function I({ orientation }: Props) {
  return <div className={`${ orientation === 0 || orientation == 180 ? 'flex-column' : 'flex-row'}`}>
      <div className='box' />
      <div className='box' />
      <div className='box' />
      <div className='box' />
  </div>;
}

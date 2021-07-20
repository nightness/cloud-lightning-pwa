import React from "react";

interface Props {
  orientation: 0 | 90 | 180 | 270;
}

export default function O({ orientation }: Props) {
  return (
    <div className='flex-row'>
      <div className='flex-column'>
        <div className="box" />
        <div className="box" />
      </div>
      <div className='flex-column'>
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
}

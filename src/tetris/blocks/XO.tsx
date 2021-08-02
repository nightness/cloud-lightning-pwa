import { BlockProps } from "..";

export default ({ style, orientation }: BlockProps) => {
  const o1 = orientation === 0 || orientation === 180 ? "box tetris-block-xo" : "blank";
  const o2 = orientation === 0 || orientation === 180 ? "blank" : "box tetris-block-xo";
  return (
    <div style={style} className="flex-row">
      <div className="flex-column">
        <div className={o1} />
        <div className={o2} />
        <div className={o1} />
      </div>
      <div className="flex-column">
        <div className={o2} />
        <div className={o1} />
        <div className={o2} />
      </div>
      <div className="flex-column">
        <div className={o1} />
        <div className={o2} />
        <div className={o1} />
      </div>
    </div>
  );
};

// export default ({ style, orientation }: BlockProps) => {
//   return (
//     <div style={style} className="flex-row">
//       <div className="flex-column">
//         <div className="box" />
//         <div className="blank" />
//         <div className="box" />
//       </div>
//       <div className="flex-column">
//         <div className="blank" />
//         <div className="box" />
//         <div className="blank" />
//       </div>
//       <div className="flex-column">
//         <div className="box" />
//         <div className="blank" />
//         <div className="box" />
//       </div>
//     </div>
//   );
// };

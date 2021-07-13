import React, { CSSProperties, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
  style?: CSSProperties;
  children?: any;
  ref?: React.RefObject<HTMLDivElement>
}

export function Container({
  children,
  style,
  ref
}: Props) {
  return (
    <div ref={ref} style={style} className='container'>
      {children}
    </div>
  );
}

export default Container;

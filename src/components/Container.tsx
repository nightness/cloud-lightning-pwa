import "./index.css";
import React, { CSSProperties, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
  style?: CSSProperties;
  children: any;
}

export function Container({
  children,
  style,
}: Props) {
  return (
    <div style={style} className='container'>
      {children}
    </div>
  );
}

export default Container;

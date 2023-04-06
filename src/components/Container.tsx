import React, { CSSProperties, forwardRef, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
  style?: CSSProperties;
  children?: any;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, style }, ref?) => {
    return (
      <div ref={ref} style={style} className="container">
        {children}
      </div>
    );
  }
);

export default Container;

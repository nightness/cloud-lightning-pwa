import "./index.css";
import React, { CSSProperties, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface Props {
  style?: CSSProperties;
  className?: string;
  children: any;
  scroll?: "x" | "y" | "none" | "both";
}

export function Container({
  children,
  style: styleOverride,
  className,
  scroll,
}: Props) {
  const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext);
  const currentThemeType = getThemedComponentStyle("Container");
  const style: CSSProperties = {};

  if (!scroll || scroll === "none") {
    style.overflowY = "hidden";
    style.overflowX = "hidden";
  } else if (scroll === "x") {
    style.overflowY = "hidden";
    style.overflowX = "scroll";
  } else if (scroll === "y") {
    style.overflowX = "hidden";
    style.overflowY = "visible";
  } else {
    style.overflowY = "scroll";
    style.overflowX = "scroll";
  }

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

export default Container;

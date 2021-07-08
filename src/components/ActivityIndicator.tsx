import "./index.css";
import React, { CSSProperties } from "react";
import {
  Dots,
  Bounce,
  Digital,
  Levels,
  Sentry,
  Spinner,
  Squares,
  Windmill,
} from "react-activity";

interface Props {
  type?:
    | "dots"
    | "bounce"
    | "digital"
    | "levels"
    | "sentry"
    | "spinner"
    | "squares"
    | "windmill";
  size?: number | "small" | "medium" | "large" | "huge" | 'gigantic';
  style?: CSSProperties;
  color?: string;
  animating?: boolean;
  speed?: number;
}

export const ActivityIndicator = ({
  type = "spinner",
  size,
  ...restProps
}: Props) => {
  let numberSize;
  switch (size) {
    case "small":
      numberSize = 14;
      break;
    case "medium":
      numberSize = 20;
      break;
    case "large":
      numberSize = 26;
      break;
    case "huge":
      numberSize = 32;
      break;
    case "gigantic":
      numberSize = 48;
      break;
    default:
      numberSize = size;
      break;
  }

  let style: CSSProperties = {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  };

  switch (type) {
    case "dots":
      return (
        <div style={style}>
          <Dots size={numberSize} {...restProps} />
        </div>
      );
    case "digital":
      return (
        <div style={style}>
          <Digital size={numberSize} {...restProps} />
        </div>
      );
    case "levels":
      return (
        <div style={style}>
          <Levels size={numberSize} {...restProps} />
        </div>
      );
    case "sentry":
      return (
        <div style={style}>
          <Sentry size={numberSize} {...restProps} />
        </div>
      );
    case "spinner":
      return (
        <div style={style}>
          <Spinner size={numberSize} {...restProps} />
        </div>
      );
    case "squares":
      return (
        <div style={style}>
          <Squares size={numberSize} {...restProps} />
        </div>
      );
    case "windmill":
      return (
        <div style={style}>
          <Windmill size={numberSize} {...restProps} />
        </div>
      );
    default:
      return <></>;
  }
};

export default ActivityIndicator;

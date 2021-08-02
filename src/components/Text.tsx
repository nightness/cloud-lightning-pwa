import React, { CSSProperties, useContext } from "react";

interface Props {
  fontSize?: number;
  size?: 1 | 2 | 3 | 4 | 5;
  style?: CSSProperties;
  disabled?: boolean;
  onClick?: () => any;
  children: string;
  className?: string;
}

export const Text = ({
  fontSize,
  disabled,
  onClick,
  style,
  children,
  size,
  className,
}: Props) => {
  if (fontSize) {
    return <div style={{ fontSize }}>{children}</div>
  }
  switch (size) {
    case 1:
      return (
        <h1
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </h5>
      );
    default:
      return (
        <p
          className={`text ${className ? className : ""}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </p>
      );
  }
};

export default Text;

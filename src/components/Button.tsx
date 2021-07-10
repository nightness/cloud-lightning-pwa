import "./index.css";
import React, { CSSProperties, useContext } from "react";
import { Button as StyledButton } from "@blueprintjs/core";

interface Props {
  title?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onPress?: () => any;
  children?: any;
}

export const Button = ({
  disabled,
  onPress,
  style: styleOverride,
  children,
  title,
}: Props) => {
  const style: CSSProperties = {
    justifySelf: "center",
    userSelect: "none",
    cursor: "pointer",
    border: "2px solid black",
    borderRadius: 5,
    ...styleOverride,
  };

  return (
    <StyledButton active={disabled !== true} style={style} onClick={onPress}>
      {title ? title : children}
    </StyledButton>
  );
};

export default Button;

import { Button, ButtonProps } from "@blueprintjs/core";
import { useState } from "react";

interface Props extends ButtonProps {
  style?: React.CSSProperties;
  onLongPress?: () => any
}

export default ({ className, style, onLongPress, ...restProps }: Props) => {
  const [touchDown, setTouchDown] = useState<Date>()
  return (
    <Button
      style={style}
      className={`button-common ${className}`}
      onPointerDown={(event) => {
        setTouchDown(new Date())
      }}
      onPointerUp={(event) => {
        if (!touchDown) return;
        const now = new Date();
        const downTime = now.valueOf() - touchDown.valueOf();
        if (onLongPress) {
          setTouchDown(undefined)
          onLongPress()
        }
      }}
      onMouseDown={(event) => {
        setTouchDown(new Date())
      }}
      onMouseUp={(event) => {
        if (!touchDown) return;
        const now = new Date();
        const downTime = now.valueOf() - touchDown.valueOf();
        if (onLongPress) {
          setTouchDown(undefined)
          onLongPress()
        }
      }}
      onTouchStart={(event) => {
        setTouchDown(new Date())
      }}
      onTouchEnd={(event) => {
        if (!touchDown) return;
        const now = new Date();
        const downTime = now.valueOf() - touchDown.valueOf();
        if (onLongPress) {
          setTouchDown(undefined)
          onLongPress()
        }
      }}
      {...restProps}
    />
  );
};

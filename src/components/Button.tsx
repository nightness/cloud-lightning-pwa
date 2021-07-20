import './index.css'
import { useState } from "react";
import { Text } from '.'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  intent?: string;
  text: string;
  //style?: React.CSSProperties;
  onLongPress?: () => any
  ref?: React.LegacyRef<HTMLButtonElement>
}

export default ({ className, text, style, ref, onLongPress, ...restProps }: Props) => {
  const [touchDown, setTouchDown] = useState<Date>()
  return (
    <button
      type='button'
      ref={ref}
      style={style}
      className={`button-common ${className ? className : ''}`}
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
    ><Text>{text}</Text></button>
  );
};

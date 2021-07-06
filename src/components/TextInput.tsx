import "./index.css";
import { CSSProperties } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  style?: CSSProperties;
  secureTextEntry?: boolean;
}

export const TextInput = ({ style, secureTextEntry, ...restProps }: Props) => {
  return (
    <input
      style={style}
      type={secureTextEntry ? "password" : "text"}
      {...restProps}
    />
  );
};

export default TextInput;

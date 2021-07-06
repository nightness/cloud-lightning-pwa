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
    <div style={style}>
      <input
        type={secureTextEntry ? "password" : "text"}
        className="editable-text"
        {...restProps}
      />
    </div>
  );
};

export default TextInput;

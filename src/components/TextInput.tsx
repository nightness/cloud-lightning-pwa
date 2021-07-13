import { CSSProperties } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  style?: CSSProperties;
  secureTextEntry?: boolean;
}

export const TextInput = ({
  style,
  className,
  secureTextEntry,
  ...restProps
}: Props) => {
  return (
    <input
      className={`${className} text-input`}
      style={style}
      type={secureTextEntry ? "password" : "text"}
      {...restProps}
    />
  );
};

export default TextInput;

import { CSSProperties } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  style?: CSSProperties;
  secureTextEntry?: boolean;
  onChangeValue?: (value: string) => any
  ref?: React.LegacyRef<HTMLInputElement>;
}

export const TextInput = ({
  ref,
  style,
  onChange,
  onChangeValue,
  className,
  secureTextEntry,
  ...restProps
}: Props) => {
  return (
    <input
      ref={ref}
      onChange={(event) => {
        if (onChange) onChange(event);
        if (!onChangeValue) return;
        onChangeValue(event.currentTarget.value)
      }}
      className={`${className} text-input`}
      style={style}
      type={secureTextEntry ? "password" : "text"}
      {...restProps}
    />
  );
};

export default TextInput;

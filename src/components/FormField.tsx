import { CSSProperties } from "react";
import TextInput from "./TextInput";
import Text from "./Text";

interface Props {
  formikProps: any;
  fieldName: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}

export default ({
  formikProps,
  fieldName,
  label,
  secureTextEntry = false,
  style,
  disabled,
  ...restProps
}: Props) => {
  return (
    <div className="form-field-container">
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row'}}>
      { label ? <Text style={{ minWidth: 200 }}>{label}</Text> : undefined }
      <TextInput
        type={secureTextEntry ? "password" : "text"}
        placeholder={label as string}
        // returnKeyType={returnKeyType}
        onChange={formikProps.handleChange(fieldName)}
        // onKeyPress={(event) => {
        //     if (event.nativeEvent.key === 'Enter') {
        //         if (returnKeyType === 'done')
        //             formikProps.handleSubmit()
        //         formikProps.preventDefault = true
        //         formikProps.stopPropagation = true
        //     }
        // }}
        // secureTextEntry={secureTextEntry}
        value={formikProps.values[fieldName]}
        //onBlur={formikProps.handleBlur(fieldName)}
        {...restProps}
      />
      </div>
      {!disabled ? (
        <Text>
          {formikProps.touched[fieldName] && formikProps.errors[fieldName]}
        </Text>
      ) : undefined}
    </div>
  );
};

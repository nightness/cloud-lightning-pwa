import './index.css'
import React, { CSSProperties } from 'react'
import TextInput from './TextInput'
import Text from './Text'

interface Props {
    formikProps: any
    fieldName: string
    label?: string
    placeholder?: string
    secureTextEntry?: boolean
    style?: CSSProperties
    textInputStyle?: CSSProperties
    disabled?: boolean
}

export default ({
    formikProps,
    fieldName,
    label,
    secureTextEntry = false,
    style,
    disabled,
    textInputStyle,
    ...restProps
}: Props) => {

    return (
        <div style={{ paddingTop: 5 }}>
            <TextInput
                disabled={disabled}
                style={textInputStyle}
                placeholder={label}
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
            {
                !disabled ? <Text>{formikProps.touched[fieldName] && formikProps.errors[fieldName]}</Text> : undefined
            }   
        </div>
    )
}
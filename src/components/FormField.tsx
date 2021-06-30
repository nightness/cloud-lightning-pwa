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
}

export default ({
    formikProps,
    fieldName,
    label,
    secureTextEntry = false,
    style,
    textInputStyle,
    ...restProps
}: Props) => {

    return (
        <div style={style}>
            <TextInput
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
            <Text>
                {formikProps.touched[fieldName] && formikProps.errors[fieldName]}
            </Text>
        </div>
    )
}
import React, { CSSProperties } from 'react'
import { EditableText } from '@blueprintjs/core'

interface Props {
    style?: CSSProperties
    onClick?: () => any
    children: any
}

export const TextInput = ({children, ...restProps}: Props) => {
    return (
        <EditableText {...restProps}>
            {children}
        </EditableText>
    )
}

export default TextInput


import './index.css'
import { CSSProperties } from 'react'
import { EditableText, EditableTextProps } from '@blueprintjs/core'

interface Props extends EditableTextProps {
    style?: CSSProperties
}

export const TextInput = ({ style, ...restProps }: Props) => {
    return (
        <EditableText className='editable-text' {...restProps} />
    )
}

export default TextInput


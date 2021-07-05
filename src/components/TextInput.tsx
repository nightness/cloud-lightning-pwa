import './index.css'
import { CSSProperties } from 'react'
import { EditableText, EditableTextProps } from '@blueprintjs/core'

interface Props extends EditableTextProps {
    style?: CSSProperties
    classRef?: React.LegacyRef<EditableText>
}

export const TextInput = ({ style, classRef, ...restProps }: Props) => {
    return (
        <EditableText ref={classRef} className='editable-text' {...restProps} />
    )
}

export default TextInput


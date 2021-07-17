import { Button, ButtonProps } from '@blueprintjs/core'

interface Props extends ButtonProps {
    style?: React.CSSProperties
}

export default ({className, style, ...restProps}: Props) => {
    return <Button style={style} className={`button-common ${className}`} {...restProps} />
}


import { Button, ButtonProps } from '@blueprintjs/core'

interface Props extends ButtonProps {

}

export default ({...restProps}: Props) => {
    return <Button {...restProps} />
}


import { Button, ButtonProps } from '@blueprintjs/core'

interface Props extends ButtonProps {

}

export default ({intent, ...restProps}: Props) => {
    return <Button intent={!intent ? 'primary' : intent} {...restProps} />
}


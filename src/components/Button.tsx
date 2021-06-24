import './components.css'
import React, { CSSProperties, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Button as StyledButton } from '@blueprintjs/core'

interface Props {
    title?: string
    style?: CSSProperties
    disabled?: boolean
    onPress?: () => any
    children?: any
}

export const Button = ({ disabled, onPress, style: styleOverride, children, title }: Props) => {
    //const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext)
    //const currentThemeType = getThemedComponentStyle('Button', disabled)
    const style: CSSProperties = {
        justifySelf: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        border: '2px solid black',
        borderRadius: 5,
        //...currentThemeType[activeTheme],
        ...styleOverride
    }

    return (
        <StyledButton active={disabled !== true} style={style} onClick={onPress}>
            {title ? title : children}
        </StyledButton>
    )
}

export default Button


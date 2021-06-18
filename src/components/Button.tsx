import React, { CSSProperties, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import StyledButton from './primitives/Button'

interface Props {
    style?: CSSProperties
    disabled?: boolean
    onClick?: () => any
    children: any
}

export const Button = ({ disabled, onClick, style: styleOverride, children }: Props) => {
    const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext)
    const currentThemeType = getThemedComponentStyle('Button', disabled)
    const style: CSSProperties = {
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        justifySelf: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        // display: 'inline - block',
        // padding: '0.5rem 0',
        // margin: '0.5rem 1rem',
        width: '11rem',
        // background: 'transparent',
        // color: 'white',
        border: '2px solid black',
        borderRadius: 5,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 5,
        // paddingBottom: 5,
        ...currentThemeType[activeTheme],
        ...styleOverride
    }

    return (
        <StyledButton style={style} onClick={onClick}>
            {children}
        </StyledButton>
    )
}

export default Button


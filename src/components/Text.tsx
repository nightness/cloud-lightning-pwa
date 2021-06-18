import React, { CSSProperties, useContext } from 'react'
import { ThemeContext } from './ThemeContext'

interface Props {
    headerSize?: 1 | 2 | 3 | 4 | 5
    style?: CSSProperties
    disabled?: boolean
    onClick?: () => any
    children: string
}

export const Text = ({ disabled, onClick, style: styleOverride, children, headerSize }: Props) => {
    const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext)
    const currentThemeType = getThemedComponentStyle('Text', disabled)
    const style: CSSProperties = {
        // display: 'inline - block',
        // padding: '0.5rem 0',
        // margin: '0.5rem 1rem',
        // width: '11rem',
        // background: 'transparent',
        // color: 'white',
        // border: '2px solid white',
        // borderRadius: 5,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 5,
        // paddingBottom: 5,
        ...currentThemeType[activeTheme],
        ...styleOverride
    }

    switch (headerSize) {
        case 1: return (
            <h1 style={style} onClick={onClick}>
                {children}
            </h1>
        )
        case 2: return (
            <h2 style={style} onClick={onClick}>
                {children}
            </h2>
        )
        case 3: return (
            <h3 style={style} onClick={onClick}>
                {children}
            </h3>
        )
        case 4: return (
            <h4 style={style} onClick={onClick}>
                {children}
            </h4>
        )
        case 5: return (
            <h5 style={style} onClick={onClick}>
                {children}
            </h5>
        )
        default: return (
            <p style={style} onClick={onClick}>
                {children}
            </p>
        )

    }

}

export default Text


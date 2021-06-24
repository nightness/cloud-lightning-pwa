import './components.css'
import React, { CSSProperties, useContext } from 'react'
import { ThemeContext } from './ThemeContext'

interface Props {
    style?: CSSProperties
    className?: string
    children: any
    scroll?: 'x' | 'y' | 'none' | 'both'
}

export function Container({ children, style: styleOverride, className, scroll }: Props) {
    const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext)
    const currentThemeType = getThemedComponentStyle('Container')
    const style: CSSProperties = {
        // display: 'inline - block',
        // padding: '0.5rem 0',
        // margin: '0.5rem 1rem',

        position: 'absolute',
        width: '100%',
        height: '100%',
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

    if (!scroll || scroll === 'none') {
        style.overflowY = 'hidden'
        style.overflowX = 'hidden'
    } else if (scroll === 'x') {
        style.overflowY = 'hidden'
        style.overflowX = 'scroll'
    } else if (scroll === 'y') {
        style.overflowX = 'hidden'
        style.overflowY = 'visible'
    } else {
        style.overflowY = 'scroll'
        style.overflowX = 'scroll'
    }

    return (
        <div style={style} className={className}>
            <div>{children}</div>
        </div>
    )
}

export default Container

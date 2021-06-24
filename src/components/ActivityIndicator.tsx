import './components.css'
import React, { CSSProperties } from 'react'
import { Dots, Bounce, Digital, Levels, Sentry, Spinner, Squares, Windmill } from "react-activity";
import { Card } from '@blueprintjs/core'

interface Props {
    type?: 'dots' | 'bounce' | 'digital' | 'levels' | 'sentry' | 'spinner' | 'squares' | 'windmill'
    size?: number | 'small' | 'medium' | 'large' | 'huge'
    style?: CSSProperties;
    color?: string;
    animating?: boolean;
    speed?: number;
    fullscreen?: boolean
}

export const ActivityIndicator = ({ type = 'spinner', size, fullscreen, ...restProps }: Props) => {
    let numberSize;
    switch (size) {
        case 'small':
            numberSize = 14
            break
        case 'medium':
            numberSize = 20
            break
        case 'large':
            numberSize = 26
            break
        case 'huge':
            numberSize = 32
            break
        default:
            numberSize = size
            break
    }
    switch (type) {
        case 'dots': return <Dots size={numberSize} {...restProps} />
        case 'bounce': return <Bounce size={numberSize} {...restProps} />
        case 'digital': return <Digital size={numberSize} {...restProps} />
        case 'levels': return <Levels size={numberSize} {...restProps} />
        case 'sentry': return <Sentry size={numberSize} {...restProps} />
        case 'spinner': return <Card><Spinner size={numberSize} {...restProps} /></Card>
        case 'squares': return <Squares size={numberSize} {...restProps} />
        case 'windmill': return <Windmill size={numberSize} {...restProps} />
    }
}

export default ActivityIndicator

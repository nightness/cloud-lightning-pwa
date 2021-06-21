import React from 'react'
import { Dots, Bounce, Digital, Levels, Sentry, Spinner, Squares, Windmill, ReactActivityIndicatorProps } from "react-activity";

interface Props {
    type?: 'dots' | 'bounce' | 'digital' | 'levels' | 'sentry' | 'spinner' | 'squares' | 'windmill'
    size?: number | 'small' | 'medium' | 'large' | 'huge'
    style?: React.CSSProperties;
    color?: string;
    animating?: boolean;
    speed?: number;
}

export const ActivityIndicator = ({ type = 'spinner', size, ...restProps }: Props) => {
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
        case 'spinner': return <Spinner size={numberSize} {...restProps} />
        case 'squares': return <Squares size={numberSize} {...restProps} />
        case 'windmill': return <Windmill size={numberSize} {...restProps} />
    }
}

export default ActivityIndicator

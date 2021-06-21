import React from 'react'
import { Dots, Bounce, Digital, Levels, Sentry, Spinner, Squares, Windmill, ReactActivityIndicatorProps } from "react-activity";

interface Props extends ReactActivityIndicatorProps {
    type?: 'dots' | 'bounce' | 'digital' | 'levels' | 'sentry' | 'spinner' | 'squares' | 'windmill'
}

export const ActivityIndicator = ({type = 'spinner', ...restProps}: Props) => {
    switch (type) {
        case 'dots': return <Dots {...restProps} />
        case 'bounce': return <Bounce {...restProps} />
        case 'digital': return <Digital {...restProps} />
        case 'levels': return <Levels {...restProps} />
        case 'sentry': return <Sentry {...restProps} />
        case 'spinner': return <Spinner {...restProps} />
        case 'squares': return <Squares {...restProps} />
        case 'windmill': return <Windmill {...restProps} />
    }
}

export default ActivityIndicator

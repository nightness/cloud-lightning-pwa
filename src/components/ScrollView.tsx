import './components.css'
import React, { CSSProperties, useContext } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export const ScrollView = ({children, ...restProps}: Props) => {
    return (
        <div {...restProps}>
            {children}
        </div>
    )
}

export default ScrollView


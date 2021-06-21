import React, { CSSProperties, useContext } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export const View = ({children, ...restProps}: Props) => {
    return (
        <div {...restProps}>
            {children}
        </div>
    )
}

export default View


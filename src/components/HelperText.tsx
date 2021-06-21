import React, { CSSProperties, useContext } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLParagraphElement> {

}

export const HelperText = ({children, ...restProps}: Props) => {
    return (
        <p {...restProps}>
            {children}
        </p>
    )
}

export default HelperText

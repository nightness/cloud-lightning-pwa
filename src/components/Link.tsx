import { useRef } from "react";
import { NavLink, LinkProps, useLocation } from "react-router-dom";
import './index.css'

interface Props extends LinkProps {
    noActiveFormatting?: boolean
}

export const Link = ({ children, className, noActiveFormatting, ...restProps }: Props) => {
    const link = useRef<HTMLAnchorElement>()
    const location = useLocation()

    const onClick = () => {
        link.current?.click()
    }

    // TODO: Don't pass same className to both the div and Link.
    const navClasses = `${!noActiveFormatting ? location.pathname === restProps.to ? 'link-active-div ' : 'link-inactive-div ' : ''}${typeof className === 'string' ? className : ''}`
    const divClasses = `${!noActiveFormatting ? location.pathname === restProps.to ? 'link-active ' : 'link-inactive ' : ''}${typeof className === 'string' ? className : ''}`

    return (
        <div className={`${navClasses}`} onClick={onClick} style={{ width: 10 }}>
            <NavLink ref={link as React.Ref<HTMLAnchorElement>} draggable={false} className={divClasses} style={{ paddingLeft: 10 }} {...restProps}>
                {children}
            </NavLink>
        </div>
    );
}

export default Link;
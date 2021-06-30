import { useRef } from "react";
import { Link as BpLink, LinkProps, useLocation } from "react-router-dom";
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

    const classNames = `${!noActiveFormatting ? location.pathname === restProps.to ? 'link-active ' : 'link-inactive ' : ''}${typeof className === 'string' ? className : '' }`

    return (
        // TODO: Don't like passing the same className to both the div and Link. It works for solid
        // color backgrounds, but not linear gradients (for example)
        <div className={`${classNames}`} onClick={onClick}>
            <BpLink ref={link as React.Ref<HTMLAnchorElement>} className={classNames} {...restProps}>
                {children}
            </BpLink>
        </div>
    );
}

export default Link;
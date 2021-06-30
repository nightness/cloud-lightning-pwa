import { useRef } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import './index.css'

const Navbar = ({ children, className, ...restProps }: LinkProps) => {
    const link = useRef<HTMLAnchorElement>()
    const location = useLocation()
    
    const onClick = () => {
        link.current?.click()
    }

    return (
        <div className={`${location.pathname === restProps.to ? 'link-active' : 'link-inactive'}`} onClick={onClick}>
            <Link ref={link as React.Ref<HTMLAnchorElement>} className={className} {...restProps}>
                {children}
            </Link>
        </div>
    );
}

export default Navbar;
import { Link, LinkProps, useLocation } from "react-router-dom";
import './index.css'

const Navbar = ({ children, ...restProps }: LinkProps) => {
    const location = useLocation()

    // const currentLocationStyle = {
    //     color: 'white',
    //     backgroundColor: '#0352fc',
    // }

    // const otherLocationStyle = {
    //     color: 'white',
    //     backgroundColor: '#033290',
    // }

    // return (
    //     <Button style={location.pathname === restProps.to ? currentLocationStyle : otherLocationStyle} intent='none' >
    //         <Link color='white' {...restProps}>
    //             {children}
    //         </Link>
    //     </Button>
    // );

    return (
        <Link className={location.pathname === restProps.to ? 'link-active' : 'link-inactive'} {...restProps}>
            {children}
        </Link>
    );
}

export default Navbar;
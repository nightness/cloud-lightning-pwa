import { Link, useLocation } from "react-router-dom";
import Text from './Text'
import './NavBar.css'

const Navbar = () => {
    const location = useLocation()

    const currentLocationStyle = {
        color: 'white',
        backgroundColor: '#0352fc',
        borderRadius: '5px',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    }

    return (
        <nav className="navbar">
            <Text headerSize={1}>Welcome to Cloud-Lightning PWA</Text>
            <div className="links">
                <Link to="/" style={location.pathname === '/' ? currentLocationStyle : undefined}>Home</Link>
                <Link to="/webRTC" style={location.pathname === '/webRTC' ? currentLocationStyle : undefined}>WebRTC</Link>
            </div>
        </nav>
    );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import './NavBar.css'

const Navbar = () => {
    const location = useLocation()

    const currentLocationStyle = {
        color: 'white',
        backgroundColor: '#f1356d',
        borderRadius: '5px',
        padding: 0
    }

    return (
        <nav className="navbar">
            <h1>Welcome to Cloud-Lightning PWA</h1>
            <div className="links">
                <Link to="/" style={location.pathname === '/' ? currentLocationStyle : undefined}>Home</Link>
                <Link to="/webRTC" style={location.pathname === '/webRTC' ? currentLocationStyle : undefined}>WebRTC</Link>
            </div>
        </nav>
    );
}

export default Navbar;
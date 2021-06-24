import { Link } from '.'
import { H1 } from '@blueprintjs/core'
import './components.css'


const Navbar = () => {
    return (
        <nav className="navbar">
            <H1>REACTJS BLUEPRINTJS PWA</H1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/WebRTC">WebRTC</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;
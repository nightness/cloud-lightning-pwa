import { Text, Link } from '.'
import './NavBar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Text headerSize={1}>Welcome to Cloud-Lightning PWA</Text>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/webRTC">WebRTC</Link>
            </div>
        </nav>
    );
}

export default Navbar;
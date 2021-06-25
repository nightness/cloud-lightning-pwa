import { useContext } from 'react'
import { Link } from '.'
import { H1 } from '@blueprintjs/core'
import './components.css'
import { FirebaseContext } from '../database/FirebaseContext'


const Navbar = () => {
    const { currentUser } = useContext(FirebaseContext)

    return (
        <nav className="navbar">
            <H1>Cloud Lightning</H1>
            <div className="links">
                <Link to="/">Home</Link>
                {currentUser ? <Link to="/WebRTC">WebRTC</Link> : <></>}
                <Link to="/about">About</Link>
                {!currentUser ? <Link to="/auth">Login</Link> : <></>}
                {currentUser ? <Link to="/logout">Logout</Link> : <></>}
            </div>
        </nav>
    );
}

export default Navbar;
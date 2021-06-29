import './index.css'
import { useContext } from 'react'
import { Link } from '.'
import { H1 } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'


const Navbar = () => {
    const { currentUser } = useContext(FirebaseContext)

    return (
        <nav className="navbar">
            <H1>Cloud Lightning</H1>
            <img className="navbar-img" src='../storm-cloud.svg' width={60} height={100} />
            <div className="links">
                <Link to="/">Home</Link>
                {currentUser ? <Link to="/WebRTC">WebRTC</Link> : <></>}
                <Link to="/about">About</Link>
                <Link to="/auth">{!!currentUser ? 'Logout' : 'Login'}</Link>
            </div>
        </nav>
    );
}

export default Navbar;
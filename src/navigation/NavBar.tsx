import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'
import SideBar from './SideBar'

export const Navbar = () => {
    const { currentUser } = useContext(FirebaseContext)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    return (
        <nav className="navbar">
            <SideBar
                isOpen={isSideBarOpen}
                onClose={() => setIsSideBarOpen(false)}
            />
            <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                    setIsSideBarOpen(true)
                }}
            >
                <Icon iconSize={20} icon='menu' />
            </Button>
            <img style={{ marginLeft: 10 }} className="navbar-img" src='../storm-cloud.svg' width={75} height={100} />
            <H1>Cloud Lightning</H1>
            <img className="navbar-img" src='../storm-cloud.svg' width={75} height={100} />
            <div className="links">
                <Link to="/">Home</Link>
                {currentUser ? <Link to="/WebRTC">WebRTC</Link> : <></>}
                <Link to="/about">About</Link>
                <Link to="/example">Playground</Link>
                <Link to="/auth">{!!currentUser ? 'Logout' : 'Login'}</Link>
            </div>
        </nav>
    );
}

export default Navbar;
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
            <div className='header-title'>
                <img style={{ marginLeft: 10 }} className="navbar-img" src='../storm-cloud.svg' width={75} height={100} />
                <H1>Cloud Lightning</H1>
                <img className="navbar-img" src='../storm-cloud.svg' width={75} height={100} />
            </div>
            <div className="links">
                <Link className='link-static' to="/auth" noActiveFormatting><Icon iconSize={34} icon='user'/></Link>                
            </div>
        </nav>
    );
}

export default Navbar;
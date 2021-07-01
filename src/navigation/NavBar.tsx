import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'
import SideBar from './SideBar'
import { Classes, Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { useLocation } from 'react-router-dom'
import { NavigationContext } from './NavigationContext'

export const Navbar = () => {
    const location = useLocation()
    const { currentUser } = useContext(FirebaseContext)    
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const { getTitle } = useContext(NavigationContext)

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
                <img style={{ marginLeft: 10 }} className="navbar-img" src='../storm-cloud.svg' width={75} height={100} draggable={false} />
                <H1>{getTitle(location.pathname)}</H1>
                <img className="navbar-img" src='../storm-cloud.svg' width={75} height={100} draggable={false} />
            </div>
            <div className="links">
                <Tooltip2
                    popoverClassName='tooltip'
                    content={`${currentUser ? 'Logout' : 'Login'}`}
                    intent="warning"
                    placement='bottom'
                    usePortal={false}                    
                >
                    <Link className='link-static' to="/auth" noActiveFormatting>
                        <Icon iconSize={34} icon='user' />
                    </Link>
                </Tooltip2>
            </div>
        </nav>
    );
}

export default Navbar;
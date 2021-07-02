import './index.css'
import { LegacyRef, useContext, useRef, useState } from 'react'
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
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const { getTitle } = useContext(NavigationContext)

    return (
        <nav className="navbar">
            <SideBar
                isOpen={isSideBarOpen}
                onClose={() => setIsSideBarOpen(false)}
            />
            <div
                style={{ background: 'transparent', padding: 15 }}
                onClick={(event) => {
                    event.currentTarget.blur()
                    setIsSideBarOpen(true)
                    setIsTooltipOpen(false)
                }}
                onFocus={(event) => event.currentTarget.blur()}
                onMouseLeave={() => {
                    setIsTooltipOpen(false)
                }}
                onMouseEnter={() => {
                    setIsTooltipOpen(true)
                }}
            >
                <Tooltip2
                    popoverClassName='tooltip-left'
                    content='Menu'
                    intent="warning"
                    placement='bottom'
                    usePortal={false}
                    isOpen={isTooltipOpen}
                >
                    <Icon
                        color='black'
                        iconSize={28}
                        icon='menu'
                        style={{ background: 'transparent' }}
                        onClick={(event) => event.currentTarget.blur()}
                        onFocus={(event) => event.currentTarget.blur()}
                    />
                </Tooltip2>
            </div>
            <div className='header-title'>
                {/* <img style={{ marginLeft: 10 }} className="navbar-img" src='../storm-cloud.svg' width={75} height={100} draggable={false} /> */}
                <H1>{getTitle(location.pathname)}</H1>
                {/* <img className="navbar-img" src='../storm-cloud.svg' width={75} height={100} draggable={false} /> */}
            </div>
            <Tooltip2
                className='links'
                popoverClassName='tooltip-right'
                content={`${currentUser ? 'Logout' : 'Login'}`}
                intent="warning"
                placement='bottom'
                usePortal={false}
            >
                <Link className='link-static' to="/auth" noActiveFormatting>
                    <Icon iconSize={34} icon='user' />
                </Link>
            </Tooltip2>
        </nav>
    );
}

export default Navbar;
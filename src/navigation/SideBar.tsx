import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button, Drawer, Classes } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'
import { NavigationContext } from './NavigationContext'
import useWindowDimensions from '../hooks/useWindowDimensions'

interface SideBarProps {
    isOpen: boolean
    onClose: () => any
}

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    const { height, width } = useWindowDimensions();
    const { currentUser } = useContext(FirebaseContext)
    const { getPaths, getTitle, hasPermission } = useContext(NavigationContext)
    const paths = getPaths().filter((path) => path !== '/auth')

    // ToDO: Set a title background
    return (
        <Drawer
            className='drawer'
            position='left'
            icon='cloud'
            isOpen={isOpen}
            onClose={onClose}
            title="Cloud Lightning"
            size={height > width ? '75%' : '35%'}
            canOutsideClickClose
            canEscapeKeyClose
            usePortal
        >
            <div className={`${Classes.DRAWER_BODY} drawer`}>
                <div style={{ flexDirection: 'column', marginLeft: 0, marginTop: 20 }}>
                    {paths.map((path) => !hasPermission(path) ? undefined :
                        <Link key={`${Math.random()}-${Math.random()}`} className='sidebar-link' to={path} onClick={onClose}>{getTitle(path)}</Link>
                    )}
                    <Link key={`${Math.random()}-${Math.random()}`} className='sidebar-link' to="/auth" onClick={onClose}>{!!currentUser ? 'Logout' : 'Login'}</Link>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>Powered by React and Blueprint</div>
        </Drawer>

    )
}

export default SideBar
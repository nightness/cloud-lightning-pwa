import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button, Drawer, Classes, Text } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'
import { NavigationContext } from './NavigationContext'

interface SideBarProps {
    isOpen: boolean
    onClose: () => any
}

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    const { currentUser } = useContext(FirebaseContext)
    const { getPaths, getTitle, hasPermission } = useContext(NavigationContext)
    const paths = getPaths().filter((path) => path !== '/auth')

    // Note: The 'drawer' className on Drawer work properly for production
    return (
        <Drawer
            className='drawer'
            position='left'
            icon='cloud'
            isOpen={isOpen}
            onClose={onClose}
            title="Cloud Lightning"
            size='30%'
            canOutsideClickClose
            canEscapeKeyClose
            usePortal
        >
            <div className={`${Classes.DRAWER_BODY} drawer`}>
                <div className={Classes.DIALOG_BODY} style={{ flexDirection: 'column' }}>
                    {paths.map((path) => !hasPermission(path) ? undefined :
                        <Link key={`${Math.random()}-${Math.random()}`} className='sidebar-link' to={path} onClick={onClose}><Text key={`${Math.random()}-${Math.random()}`} title={getTitle(path)} /></Link>
                    )}
                    <Link key={`${Math.random()}-${Math.random()}`} className='sidebar-link' to="/auth" onClick={onClose}><Text key={`${Math.random()}-${Math.random()}`} title={!!currentUser ? 'Logout' : 'Login'} /></Link>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>ReactJS BlueprintJS PWA</div>
        </Drawer>

    )
}

export default SideBar
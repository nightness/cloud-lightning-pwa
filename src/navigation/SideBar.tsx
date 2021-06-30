import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button, Drawer, Classes } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'

interface SideBarProps {
    isOpen: boolean
    onClose: () => any
}

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    const { currentUser } = useContext(FirebaseContext)

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
        >
            <div className={`${Classes.DRAWER_BODY} drawer`}>
                <div className={Classes.DIALOG_BODY} style={{ flexDirection: 'column' }}>
                    <Link className='sidebar-link' to="/" onClick={onClose}>Home</Link>
                    {currentUser ? <Link className='sidebar-link' to="/WebRTC" onClick={onClose}>WebRTC</Link> : <></>}
                    <Link className='sidebar-link' to="/about" onClick={onClose}>About</Link>
                    <Link className='sidebar-link' to="/example" onClick={onClose}>Playground</Link>                    
                    <Link className='sidebar-link' to="/auth" onClick={onClose}>{!!currentUser ? 'Logout' : 'Login'}</Link>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>Footer</div>
        </Drawer>

    )
}

export default SideBar
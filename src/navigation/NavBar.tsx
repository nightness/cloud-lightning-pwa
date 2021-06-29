import './index.css'
import { useContext, useState } from 'react'
import { Link } from '../components'
import { H1, Icon, Button, Drawer, Classes } from '@blueprintjs/core'
import { FirebaseContext } from '../database/FirebaseContext'

interface SideBarProps {
    isOpen: boolean
    onClose: () => any
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    return (
        <Drawer
            position='left'
            icon='info-sign'
            isOpen={isOpen}
            onClose={onClose}
            title="Description"
        >
            <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        <strong>
                            Data integration is the seminal problem of the digital age. For over ten years,
                            we’ve helped the world’s premier organizations rise to the challenge.
                        </strong>
                    </p>
                    <p>
                        Palantir Foundry radically reimagines the way enterprises interact with data by
                        amplifying and extending the power of data integration. With Foundry, anyone can source,
                        fuse, and transform data into any shape they desire. Business analysts become data
                        engineers — and leaders in their organization’s data revolution.
                    </p>
                    <p>
                        Foundry’s back end includes a suite of best-in-class data integration capabilities: data
                        provenance, git-style versioning semantics, granular access controls, branching,
                        transformation authoring, and more. But these powers are not limited to the back-end IT
                        shop.
                    </p>
                    <p>
                        In Foundry, tables, applications, reports, presentations, and spreadsheets operate as
                        data integrations in their own right. Access controls, transformation logic, and data
                        quality flow from original data source to intermediate analysis to presentation in real
                        time. Every end product created in Foundry becomes a new data source that other users
                        can build upon. And the enterprise data foundation goes where the business drives it.
                    </p>
                    <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>Footer</div>
        </Drawer>

    )
}

const Navbar = () => {
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
                <Icon iconSize={16} icon='menu' />
            </Button>
            <H1>Cloud Lightning</H1>
            <img className="navbar-img" src='../storm-cloud.svg' width={60} height={100} />
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
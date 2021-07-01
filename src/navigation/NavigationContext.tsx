import React, { createContext, useState, useContext, useRef } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { FirebaseContext } from '../database/FirebaseContext'

type ContextType = {
    registerPage: (path: string, title: string, component: React.FC, requiresAuth?: boolean) => any
    getPaths: () => string[]
    getTitle: (path: string) => string | undefined
    getComponent: (path: string) => React.FC | undefined
    hasPermission: (path: string) => boolean
    currentPath?: string
}

export const NavigationContext = createContext<ContextType>({
    registerPage: () => undefined,
    getPaths: () => [],
    getTitle: () => undefined,
    getComponent: () => undefined,
    hasPermission: () => false
})

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const Pages = () => {
    const { getPaths, getComponent } = useContext(NavigationContext)
    const paths = getPaths()
    return (
        <Switch>
            {paths.map((path) => (
                <Route exact path={path} component={getComponent(path)} key={`${Math.random()}-${path}`} />
            ))}
        </Switch>
    )
}

export const NavigationProvider = ({ children }: Props) => {
    const { currentUser } = useContext(FirebaseContext)    
    const [routes] = useState(new Map<string, string>())
    const [components] = useState(new Map<string, React.FC>())
    const [requiresAuthentication] = useState(new Map<string, boolean>())
    const location = useLocation()

    const registerPage = (path: string, title: string, component: React.FC, requiresAuth: boolean = false) => {
        routes.set(path, title)
        components.set(path, component)
        requiresAuthentication.set(path, requiresAuth)
    }

    const getPaths = () => Array.from(routes.keys()) as string[]
    const getTitle = (path: string) => routes.get(path)
    const getComponent = (path: string) => components.get(path)
    const hasPermission = (path: string) => {
        const requiresAuth = requiresAuthentication.get(path)
        if (!requiresAuth) return true
        return !(!currentUser && requiresAuthentication.get(path))
    }

    return (
        <NavigationContext.Provider
            value={{
                registerPage,
                getTitle,
                getComponent,
                getPaths,
                hasPermission,
                currentPath: location.pathname,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

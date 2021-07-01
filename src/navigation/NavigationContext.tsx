import React, { createContext, useState, useContext, useRef } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

type ContextType = {
    registerPage: (path: string, title: string, component: React.FC) => any
    getPaths: () => string[]
    getTitle: (path: string) => string | undefined
    getComponent: (path: string) => React.FC | undefined
    currentPath?: string
}

export const NavigationContext = createContext<ContextType>({
    registerPage: (path, title) => undefined,
    getPaths: () => [],
    getTitle: (path) => undefined,
    getComponent: (path) => undefined
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
    const routesComponent = useRef<React.FC>(() => <></>)
    const [routes] = useState(new Map<string, string>())
    const [components] = useState(new Map<string, React.FC>())
    const location = useLocation()

    const registerPage = (path: string, title: string, component: React.FC) => {
        routes.set(path, title)
        components.set(path, component)
    }

    const getPaths = () => Array.from(routes.keys()) as string[]
    const getTitle = (path: string) => routes.get(path)
    const getComponent = (path: string) => components.get(path)

    return (
        <NavigationContext.Provider
            value={{
                registerPage,
                getTitle,
                getComponent,
                getPaths,
                currentPath: location.pathname,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

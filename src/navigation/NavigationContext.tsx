import React, { createContext, useState, useEffect, useContext, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

type ContextType = {
    registerTitle: (path: string, title: string) => any
    getTitle: (path: string) => string | undefined
    currentPath?: string
}

export const NavigationContext = createContext<ContextType>({
    registerTitle: (path, title) => undefined,
    getTitle: (path) => undefined
})

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const NavigationProvider = ({ children }: Props) => {
    const [routes] = useState(new Map<string, string>())
    const location = useLocation()

    const registerTitle = (path: string, title: string) => {
        routes.set(path, title)
    }

    const getTitle = (path: string) => {
        return routes.get(path)
    }

    return (
        <NavigationContext.Provider
            value={{
                registerTitle,
                getTitle,
                currentPath: location.pathname
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

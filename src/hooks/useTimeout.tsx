import React, { createContext, useState, useContext, useRef, useEffect } from 'react'

export const useTimeout = (callBkFn: () => any, interval: number = 1000) => {
    const callback = useRef(callBkFn)

    useEffect(() => {
        const timer = setTimeout(() => {
            callback.current()
        }, interval);
        return () => clearTimeout(timer);
    }, []);
}

export default useTimeout
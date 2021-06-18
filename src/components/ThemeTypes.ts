import { CSSProperties } from 'react'

export type Theme = 'Light' | 'Dark'

export interface ThemeType {
    Light: CSSProperties
    Dark: CSSProperties
}

export type NamedTheme = [string, ThemeType]

export type Themes = NamedTheme[]

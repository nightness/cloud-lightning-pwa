import React, { createContext, useState } from "react";
import { Theme, Themes, ThemeType } from "./ThemeTypes";

type ContextType = {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
  themes?: any[];
  styles?: any[];
  getThemedComponentStyle: (
    componentName: string,
    isDisabled?: boolean,
    hasFocus?: boolean
  ) => ThemeType;
};

export const ThemeContext = createContext<ContextType>({
  activeTheme: "Light",
  setActiveTheme: (theme: Theme) => undefined,
  getThemedComponentStyle: (
    componentName: string,
    isDisabled?: boolean,
    hasFocus?: boolean
  ) => ({
    Light: {},
    Dark: {},
  }),
});

interface Props {
  children: JSX.Element;
  themes: Themes;
}

export const ThemeProvider = ({ themes, children }: Props) => {
  const [activeTheme, setActiveTheme] = useState<Theme>("Light");

  const getThemedComponentStyle = (
    componentName: string,
    isDisabled?: boolean,
    hasFocus?: boolean
  ) => {
    if (isDisabled) componentName += "Disabled";
    for (let i = 0; i < themes.length; i++) {
      const theme = themes[i];
      if (theme[0] === componentName) return theme[1];
    }
    console.info(
      `No theme provided for '${componentName}' components... Default theme used.`
    );
    return {
      Light: { background: "white", color: "black" },
      Dark: { background: "black", color: "white" },
    };
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        getThemedComponentStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";

export const getCssVar = (name: string) => {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name);
};

export const setCssVar = (name: string, value: string) => {
  return document.documentElement.style.setProperty(name, value);
};

export type Theme = "Light" | "Dark";

type ContextType = {
  activeTheme: Theme;
  setActiveTheme?: (theme: Theme) => void;
  themes?: any[];
  styles?: any[];
};

export const ThemeContext = createContext<ContextType>({
  activeTheme: "Light",
});

interface Props {
  children: JSX.Element;
}

export const ThemeProvider = ({ children }: Props) => {
  const [activeTheme, setActiveTheme] = useState<Theme>("Light");

  useEffect(() => {
    console.log("Theme: ", activeTheme);
    const names = [
      "app-background-color",
      "app-border",
      "app-color",
      "drawer-background",
      "tooltip-background",
      "console-background-color"
    ];
    names.forEach((name) => {
      setCssVar(
        `--${name}`,
        `var(--${name}-${activeTheme === "Light" ? "light" : "dark"})`
      );
    });
  }, [activeTheme, setActiveTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

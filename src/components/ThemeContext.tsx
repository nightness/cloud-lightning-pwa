import React, { createContext, useState } from "react";

export type Theme = "Light" | "Dark";

type ContextType = {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
  themes?: any[];
  styles?: any[];
};

export const ThemeContext = createContext<ContextType>({
  activeTheme: "Light",
  setActiveTheme: (theme: Theme) => undefined,
});

interface Props {
  children: JSX.Element;
}

export const ThemeProvider = ({ children }: Props) => {
  const [activeTheme, setActiveTheme] = useState<Theme>("Light");

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

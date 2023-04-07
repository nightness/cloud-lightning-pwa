import { createContext, useEffect, useState } from "react";
import { useWindowDimensions } from "../hooks";

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
  const { width, height } = useWindowDimensions();
  // const value = useBreakpoint("none", [
  //   ["micro", "0.8rem"],
  //   ["mobile", "0.9rem"],
  //   ["tablet", "1.0rem"],
  //   ["small", "1.1rem"],
  //   ["medium", "1.2rem"],
  //   ["large", "1.3rem"],
  //   ["device", "1rem"],
  //   ["smallDevice", "0.9rem"]
  // ]);

  // useEffect(() => {
  //   setCssVar('--device-font-size', value)
  // }, [value])

  useEffect(() => {
    console.log("Theme: ", activeTheme);
    const names = [
      "app-background-color",
      "app-border",
      "app-color",
      "drawer-background",
      "tooltip-background",
      "console-background-color",
      "button-background",
      "card-background-color",
      "input-background-color",
      "input-color",
      "scrollbar-chat",
      "scrollbar-thumb",
      "link-color",
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

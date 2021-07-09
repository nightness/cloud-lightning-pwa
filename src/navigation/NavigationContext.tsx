import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { FirebaseContext } from "../database/FirebaseContext";
import { useForceUpdate, useTimeout } from "../hooks";

interface PageDefinition {
  path: string;
  title: string;
  component: React.FC;
  requiresAuthentication: boolean;
}

type ContextType = {
  addPage: (
    path: string,
    title: string,
    component: React.FC,
    requiresAuth?: boolean
  ) => any;
  insertPage: (
    index: number,
    path: string,
    title: string,
    component: React.FC,
    requiresAuth?: boolean
  ) => any;
  forceUpdate: () => any;
  pages: PageDefinition[];
  currentPath?: string;
};

export const NavigationContext = createContext<ContextType>({
  addPage: () => undefined,
  insertPage: () => undefined,
  forceUpdate: () => undefined,
  pages: [],
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PageNotFound = () => {
  const [redirecting, setRedirecting] = useState(false);

  useTimeout(() => {
    setRedirecting(true);
  }, 1500);

  return <>{redirecting ? <Redirect to="/" /> : <h2>Redirecting...</h2>}</>;
};

export const Pages = () => {
  const { pages } = useContext(NavigationContext);
  return (
    <Switch>
      {pages.map((page) => (
        <Route
          exact
          path={page.path}
          component={page.component}
          key={`${Math.random()}-${page.path}`}
        />
      ))}
      <Route component={PageNotFound} />
    </Switch>
  );
};

export const NavigationProvider = ({ children }: Props) => {
  const forceUpdate = useForceUpdate();
  const { currentUser } = useContext(FirebaseContext);
  const [pages] = useState<PageDefinition[]>([]);
  const location = useLocation();

  const addPage = (
    path: string,
    title: string,
    component: React.FC,
    requiresAuthentication: boolean = false
  ) => {
    if (!pages.find((page) => page.path === path))
      pages.push({
        path,
        title,
        component,
        requiresAuthentication,
      });
  };

  const insertPage = (
    index: number,
    path: string,
    title: string,
    component: React.FC,
    requiresAuthentication: boolean = false
  ) => {
    if (!pages.find((page) => page.path === path))
      pages.splice(index, 0, {
        path,
        title,
        component,
        requiresAuthentication,
      });
  };

  return (
    <NavigationContext.Provider
      value={{
        addPage,
        insertPage,
        forceUpdate,
        pages,
        currentPath: location.pathname,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

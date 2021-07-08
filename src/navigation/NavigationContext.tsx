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

type ContextType = {
  registerPage: (
    path: string,
    title: string,
    component: React.FC,
    requiresAuth?: boolean
  ) => any;
  getPaths: () => string[];
  getTitle: (path: string) => string | undefined;
  getComponent: (path: string) => React.FC | undefined;
  hasPermission: (path: string) => boolean;
  forceUpdate: () => any;
  currentPath?: string;
};

export const NavigationContext = createContext<ContextType>({
  registerPage: () => undefined,
  getPaths: () => [],
  getTitle: () => undefined,
  getComponent: () => undefined,
  hasPermission: () => false,
  forceUpdate: () => undefined
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
  const { getPaths, getComponent } = useContext(NavigationContext);
  const paths = getPaths();
  return (
    <Switch>
      {paths.map((path) => (
        <Route
          exact
          path={path}
          component={getComponent(path)}
          key={`${Math.random()}-${path}`}
        />
      ))}
      <Route component={PageNotFound} />
    </Switch>
  );
};

export const NavigationProvider = ({ children }: Props) => {
  const forceUpdate = useForceUpdate()
  const { currentUser } = useContext(FirebaseContext);
  const [routes] = useState(new Map<string, string>());
  const [components] = useState(new Map<string, React.FC>());
  const [requiresAuthentication] = useState(new Map<string, boolean>());
  const location = useLocation();

  const registerPage = (
    path: string,
    title: string,
    component: React.FC,
    requiresAuth: boolean = false
  ) => {
    routes.set(path, title);
    components.set(path, component);
    requiresAuthentication.set(path, requiresAuth);
  };

  const getPaths = () => Array.from(routes.keys()) as string[];
  const getTitle = (path: string) => routes.get(path);
  const getComponent = (path: string) => components.get(path);
  const hasPermission = (path: string) => {
    const requiresAuth = requiresAuthentication.get(path);
    if (!requiresAuth) return true;
    return !(!currentUser && requiresAuthentication.get(path));
  };

  return (
    <NavigationContext.Provider
      value={{
        registerPage,
        getTitle,
        getComponent,
        getPaths,
        hasPermission,
        forceUpdate,
        currentPath: location.pathname,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

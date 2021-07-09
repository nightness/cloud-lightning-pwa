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
  children?: PageDefinition[];
  requiresAuthentication?: boolean;
}

type ContextType = {
  addPage: (page: PageDefinition, parentsChildPages?: PageDefinition[], atParentIndex?: number) => any
  removePage: (atChildIndex: number, parentsChildPages?: PageDefinition[]) => any
  forceUpdate: () => any;
  pages: PageDefinition[];
  currentPath?: string;
};

export const NavigationContext = createContext<ContextType>({
  addPage: () => undefined,
  removePage: () => undefined,
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

  const addPage = (page: PageDefinition, parentsChildPages: PageDefinition[] = pages, atParentIndex?: number) => {
    if (pages.find((pg) => page.path === pg.path)) return
    if (typeof atParentIndex !== 'number')
      parentsChildPages.push(page);
    else
      parentsChildPages.splice(atParentIndex, 0, page)
  }

  const removePage = (atParentIndex: number, parentsChildPages: PageDefinition[] = pages) => {
    parentsChildPages.splice(atParentIndex, 0)
  }

  return (
    <NavigationContext.Provider
      value={{
        addPage,
        removePage,
        forceUpdate,
        pages,
        currentPath: location.pathname,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

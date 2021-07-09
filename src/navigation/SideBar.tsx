import "./index.css";
import { useContext } from "react";
import { Link } from "../components";
import { Drawer, Classes } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";
import { NavigationContext, PageDefinition } from "./NavigationContext";
import { useWindowDimensions } from "../hooks";

interface SideBarPageLinkProps {
  pages: PageDefinition[];
  onClose: () => any;
  depth: number;
}

const SideBarPageLink = ({ pages, onClose, depth }: SideBarPageLinkProps) => {
  const { currentUser } = useContext(FirebaseContext);

  return (
    <>
      {pages.map((page) =>
        page.requiresAuthentication && !currentUser ? undefined : (
          <>
            <Link
              key={`${Math.random()}-${Math.random()}`}
              className="sidebar-link"
              to={page.path}
              onClick={onClose}
              style={{ paddingLeft: `${depth * 10 + 5}pt` }}
            >
              {page.title}
            </Link>
            {!page.children ? undefined : (
              <SideBarPageLink pages={page.children} depth={depth + 1} onClose={onClose} />
            )}
          </>
        )
      )}
    </>
  );
};

interface SideBarProps {
  isOpen: boolean;
  onClose: () => any;
}

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const { height, width } = useWindowDimensions();
  const { currentUser } = useContext(FirebaseContext);
  const { pages } = useContext(NavigationContext);
  const filteredPages = pages.filter((page) => page.path !== "/auth");

  return (
    <Drawer
      className={`drawer-header`}
      position="left"
      icon="cloud"
      isOpen={isOpen}
      onClose={onClose}
      title="Cloud Lightning"
      size={height > width ? "75%" : "35%"}
      canOutsideClickClose
      canEscapeKeyClose
      usePortal={false}
    >
      <div className={`${Classes.DRAWER_BODY} drawer-body`}>
        <div className="side-links">
          <SideBarPageLink pages={filteredPages} depth={0} onClose={onClose} />
          <Link
            key={`${Math.random()}-${Math.random()}`}
            className="sidebar-link"
            to="/auth"
            onClick={onClose}
          >
            {!!currentUser ? "Logout" : "Login"}
          </Link>
        </div>
      </div>
      <div className={Classes.DRAWER_FOOTER}>
        Powered by React and Blueprint
      </div>
    </Drawer>
  );
};

export default SideBar;

import "./index.css";
import { useContext } from "react";
import { Link } from "../components";
import { Drawer, Classes } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";
import { NavigationContext } from "./NavigationContext";
import { useWindowDimensions } from "../hooks";

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
          {filteredPages.map((page) =>
            page.requiresAuthentication && !currentUser ? undefined : (
              <Link
                key={`${Math.random()}-${Math.random()}`}
                className="sidebar-link"
                to={page.path}
                onClick={onClose}
              >
                {page.title}
              </Link>
            )
          )}
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

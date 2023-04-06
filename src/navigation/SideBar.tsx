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
}

interface ExtendedPageDefinition extends PageDefinition {
  depth: number;
}

const getFlattenedPages = (
  pages: PageDefinition[],
  depth: number = 0,
  memo: ExtendedPageDefinition[] = []
) => {
  pages.map((page) => {
    const exPage = { depth, ...page };
    memo.push(exPage);
    if (page.children) getFlattenedPages(page.children, depth + 1, memo);
  });
  return memo;
};

const SideBarPageLink = ({ pages, onClose }: SideBarPageLinkProps) => {
  const { currentUser } = useContext(FirebaseContext);
  const flattenedPages = getFlattenedPages(pages);

  return (
    <>
      {flattenedPages.map((page) =>
        page.requiresAuthentication && !currentUser ? undefined : (
          <Link
            key={`${Math.random()}-${Math.random()}`}
            className="sidebar-link"
            to={page.path}
            onClick={onClose}
            style={{ paddingLeft: `${page.depth * 10 + 5}pt` }}
          >
            {page.title}
          </Link>
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
      size={height > width * 1.25 ? "75%" : "24vw"}
      canOutsideClickClose
      canEscapeKeyClose
      usePortal={true}
    >
      <div className={`${Classes.DRAWER_BODY} drawer-body`}>
        <div className="side-links">
          <SideBarPageLink pages={filteredPages} onClose={onClose} />
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
      <div className={`${Classes.DRAWER_FOOTER} sidebar-footer`}>
        Powered by React and Blueprint
      </div>
    </Drawer>
  );
};

export default SideBar;

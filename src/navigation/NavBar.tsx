import "./index.css";
import { useContext, useState } from "react";
import { Link } from "../components";
import { H1, Icon } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useLocation } from "react-router-dom";
import { NavigationContext, SideBar } from ".";
import { PageDefinition } from "./NavigationContext";

export const Navbar = () => {
  const location = useLocation();
  const { currentUser } = useContext(FirebaseContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { getTitle } = useContext(NavigationContext);
  const currentPageTitle = getTitle(location.pathname);

  return (
    <nav className="navbar">
      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <div
        style={{ background: "transparent", marginRight: 15 }}
        onClick={(event) => {
          event.currentTarget.blur();
        }}
        onFocus={(event) => {
          event.currentTarget.blur();
          setIsSideBarOpen(true);
          setIsTooltipOpen(false);
        }}
        onMouseLeave={() => {
          setIsTooltipOpen(false);
        }}
        onMouseEnter={() => {
          setIsTooltipOpen(true);
        }}
      >
        <Tooltip2
          popoverClassName="tooltip-left"
          content="Menu"
          intent="warning"
          placement="bottom"
          usePortal={false}
          isOpen={isTooltipOpen}
        >
          <Icon
            color="black"
            iconSize={28}
            icon="menu"
            style={{
              background: "transparent",
              marginLeft: 5,
              padding: 10,
            }}
            onClick={(event) => event.currentTarget.blur()}
            onFocus={(event) => event.currentTarget.blur()}
          />
        </Tooltip2>
      </div>
      <div className="header-title">
        <H1 style={{ fontWeight: 600, paddingLeft: 0, marginRight: 15 }}>
          {currentPageTitle ? currentPageTitle : "Page Not Found"}
        </H1>
      </div>
      <Tooltip2
        className="profile-link-tooltip"
        popoverClassName="tooltip-right"
        content={`${currentUser ? "Logout" : "Login"}`}
        intent="warning"
        placement="bottom"
        usePortal={false}
      >
        <Link className="link-static" to="/auth" noActiveFormatting>
          {currentUser?.photoURL ? (
            <img className="img" src={currentUser?.photoURL} />
          ) : (
            <Icon
              style={{ userSelect: "none", pointerEvents: "none" }}
              iconSize={34}
              icon="user"
            />
          )}
        </Link>
      </Tooltip2>
    </nav>
  );
};

export default Navbar;

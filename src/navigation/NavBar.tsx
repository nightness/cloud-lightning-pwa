import "./index.css";
import { useContext, useEffect, useState } from "react";
import { Link, ThemeContext } from "../components";
import { Button, H1, Icon } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useLocation } from "react-router-dom";
import { NavigationContext, SideBar } from ".";
import { PageDefinition } from "./NavigationContext";

export const Navbar = () => {
  const location = useLocation();
  const { activeTheme, setActiveTheme } = useContext(ThemeContext);
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
          intent="none"
          placement="bottom"
          usePortal={true}
          isOpen={isTooltipOpen}
        >
          <Icon
            color={`${activeTheme === "Light" ? "black" : "white"}`}
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
        {currentPageTitle ? currentPageTitle : "Page Not Found"}
      </div>
      <div style={{ marginRight: "25px" }}>
        <Link
          className="link-static"
          to="/auth"
          noActiveFormatting
          style={{
            background: "transparent",
          }}
        >
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
      </div>
    </nav>
  );
};

export default Navbar;

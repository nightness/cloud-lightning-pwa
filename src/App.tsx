import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Home, WebRTC, Profile, Authentication, Matrix } from "./pages";
import { FirebaseProvider } from "./database/FirebaseContext";
import { WebRtcProvider } from "./webrtc/WebRtcContext";
import {
  NavBar,
  NavigationContext,
  NavigationProvider,
  Pages,
} from "./navigation";
import { WallMessenger } from "./messenger";
import { TestPage, Games } from "./pages"
import TicTacToe from "./pages/TicTacToe";
import { DisplayError, ThemeProvider } from "./components";
import { BreakpointProvider } from "@w11r/use-breakpoint";
import { MatrixProvider } from "./matrix/MatrixContext";
import TetrisPage from "./tetris/TetrisPage";

const DisplayErrorText: React.FC = (props) => {
  return <DisplayError permissionDenied />;
};

const MainDocument = () => {
  const { addPage, pages } = useContext(NavigationContext);

  addPage({
    path: "/",
    title: "Cloud Lightning",
    component: Home,
    children: [
      {
        path: "/home/test",
        title: "Test Page",
        component: TestPage,
      },
      {
        path: "/home/error",
        title: "Display Error",
        component: DisplayErrorText,
      },
    ]
  });
  addPage({
    path: "/games",
    title: "Games",
    component: Games,
    children: [
      {
        path: "/games/TicTacToe",
        title: "Tic Tac Toe",
        component: TicTacToe,
      }, {
        path: "/games/Tetris",
        title: "Tetris",
        component: TetrisPage,
      }
    ]    
    // requiresAuthentication: true,
  });
  // addPage({
  //   path: "/wall",
  //   title: "Member Walls",
  //   component: WallMessenger,
  //   requiresAuthentication: true,
  // });
  addPage({
    path: "/WebRTC",
    title: "WebRTC Chat",
    component: WebRTC,
    requiresAuthentication: true,
  });
  addPage({
    path: "/matrix",
    title: "Matrix Chat",
    component: Matrix,
    requiresAuthentication: true,
  });
  addPage({
    path: "/profile",
    title: "Profile",
    component: Profile,
    requiresAuthentication: true,
  });
  addPage({
    path: "/auth",
    title: "Cloud Lightning",
    component: Authentication,
  });

  return (
    <div className={`App`}>
      <NavBar />
      <div className={`content`}>
        <Pages pages={pages} />
      </div>
    </div>
  );
};

function App() {
  return (
    <BreakpointProvider>
      <ThemeProvider>
        <Router>
          <FirebaseProvider>
            <MatrixProvider>
              <NavigationProvider>
                <WebRtcProvider>
                  <MainDocument />
                </WebRtcProvider>
              </NavigationProvider>
            </MatrixProvider>
          </FirebaseProvider>
        </Router>
      </ThemeProvider>
    </BreakpointProvider>
  );
}

export default App;

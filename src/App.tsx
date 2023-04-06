import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Home, WebRTC, Profile, Authentication } from "./pages";
import { FirebaseProvider } from "./database/FirebaseContext";
import {
  NavBar,
  NavigationContext,
  NavigationProvider,
  Pages,
} from "./navigation";
import { WallMessenger } from "./pages/messenger";
import { Games } from "./pages";
import TicTacToe from "./pages/tictactoe/TicTacToe";
import { DisplayError, ThemeProvider } from "./components";
import { BreakpointProvider } from "@w11r/use-breakpoint";
import TetrisPage from "./pages/tetris/TetrisPage";
import Spotify from "./pages/spotify/Spotify";
import {
  SpotifyContext,
  SpotifyProvider,
} from "./pages/spotify/SpotifyContext";
import SpotifyPlayer from "./pages/spotify/Player";
import ConnectFourBoard from "./pages/connect4/ConnectFourBoard";

function App() {
  return (
    <ProviderNest>
      <MainDocument />
    </ProviderNest>
  );
}

// const DisplayErrorText: React.FC = (props) => {
//   return <DisplayError permissionDenied />;
// };

const MainDocument = () => {
  const { pages } = usePages();
  const spotify = useContext(SpotifyContext);

  return (
    <div className={`App`}>
      <NavBar />
      <div className={`content`}>
        <Pages pages={pages} />
      </div>
      {spotify.api.getAccessToken() ? <SpotifyPlayer /> : <></>}
    </div>
  );
};

function ProviderNest({ children }: { children: JSX.Element }) {
  return (
    <BreakpointProvider>
      <ThemeProvider>
        <Router>
          <FirebaseProvider>
            <SpotifyProvider>
              <NavigationProvider>{children}</NavigationProvider>
            </SpotifyProvider>
          </FirebaseProvider>
        </Router>
      </ThemeProvider>
    </BreakpointProvider>
  );
}

const usePages = () => {
  const { addPage, pages } = useContext(NavigationContext);

  addPage({
    path: "/",
    title: "Cloud Lightning",
    component: Home,
    children: [
      {
        path: "/home/wall",
        title: "My Wall",
        component: WallMessenger,
        requiresAuthentication: true,
      },
      {
        path: "/home/spotify",
        title: "Spotify",
        component: Spotify,
        requiresAuthentication: true,
      },
      // {
      //   path: "/home/test",
      //   title: "Test Page",
      //   component: TestPage,
      // },
      // {
      //   path: "/home/error",
      //   title: "Display Error",
      //   component: DisplayErrorText,
      // },
    ],
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
      },
      {
        path: "/games/Tetris",
        title: "Tetris",
        component: TetrisPage,
      },
      {
        path: "/games/connect4",
        title: "Connect Four",
        component: ConnectFourBoard,
      },
    ],
    // requiresAuthentication: true,
  });
  addPage({
    path: "/WebRTC",
    title: "WebRTC Chat",
    component: WebRTC,
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

  return { pages };
};

export default App;

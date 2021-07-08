import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Home, WebRTC, Profile, Authentication, Matrix } from './pages'
import { FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './webrtc/WebRtcContext';
import { NavBar, NavigationContext, NavigationProvider, Pages } from './navigation';
import { WallMessenger } from './messenger';
import TestPage from './pages/TestPage';

const MainDocument = () => {
  const { registerPage } = useContext(NavigationContext)

  registerPage('/', 'Home', Home)
  registerPage('/wall', "Member Walls", WallMessenger, true)
  registerPage('/WebRTC', 'Video Chat', WebRTC, true)
  registerPage('/matrix', 'Matrix Chat', Matrix, true)
  registerPage('/profile', 'Profile', Profile, true)
  registerPage('/test', 'Test Page', TestPage, true)
  registerPage('/auth', 'Cloud Lightning', Authentication)

  return (
    <div className={`App`}>
      <NavBar />
      <div className={`content`}>
        <Pages />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <FirebaseProvider>
        <NavigationProvider>
          <WebRtcProvider>
            <MainDocument />
          </WebRtcProvider>
        </NavigationProvider>
      </FirebaseProvider>
    </Router>
  );
}

export default App;

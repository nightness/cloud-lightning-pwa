import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Home, WebRTC, Profile, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';
import { NavigationContext, NavigationProvider, Pages } from './navigation/NavigationContext';
import { WallMessenger } from './messenger';

const MainDocument = () => {
  const { registerPage } = useContext(NavigationContext)

  registerPage('/', 'Home', Home)
  registerPage('/wall', "Member Walls", WallMessenger, true)
  registerPage('/WebRTC', 'Web Chat', WebRTC, true)
  registerPage('/profile', 'Profile', Profile, true)
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

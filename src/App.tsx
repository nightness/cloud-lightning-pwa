import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Home, WebRTC, About, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';
import { NavigationContext, NavigationProvider, Pages } from './navigation/NavigationContext';

const MainDocument = () => {
  const { registerPage } = useContext(NavigationContext)

  registerPage('/', 'Home', Home)
  registerPage('/auth', 'Cloud Lightning', Authentication)
  registerPage('/about', 'About', About)
  registerPage('/WebRTC', 'WebRTC', WebRTC)

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
      <NavigationProvider>
        <FirebaseProvider>
          <WebRtcProvider>
            <MainDocument />
          </WebRtcProvider>
        </FirebaseProvider>
      </NavigationProvider>
    </Router>
  );
}

export default App;

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
  const { addPage: registerPage } = useContext(NavigationContext)

  registerPage({
    path: '/',
    title: 'Home',
    component: Home
  })
  registerPage({
    path: '/wall',
    title: "Member Walls",
    component: WallMessenger,
    requiresAuthentication: true
  })
  registerPage({
    path: '/WebRTC',
    title: 'Video Chat',
    component: WebRTC,
    requiresAuthentication: true
  })
  registerPage({
    path: '/matrix',
    title: 'Matrix Chat',
    component: Matrix,
    requiresAuthentication: true
  })
  registerPage({
    path: '/profile',
    title: 'Profile',
    component: Profile,
    requiresAuthentication: true
  })
  registerPage({
    path: '/test',
    title: 'Test Page',
    component: TestPage,
    requiresAuthentication: true
  })
  registerPage({
    path: '/auth',
    title: 'Cloud Lightning',
    component: Authentication
  })

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

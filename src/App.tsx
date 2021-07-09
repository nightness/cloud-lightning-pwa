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
  const { addPage } = useContext(NavigationContext)

  addPage({
    path: '/',
    title: 'Home',
    component: Home,
    children: [
      {
        path: '/home/test',
        title: 'Test Page',
        component: TestPage,
        requiresAuthentication: true
      }
    ]
  })
  addPage({
    path: '/wall',
    title: "Member Walls",
    component: WallMessenger,
    requiresAuthentication: true
  })
  addPage({
    path: '/WebRTC',
    title: 'Video Chat',
    component: WebRTC,
    requiresAuthentication: true
  })
  addPage({
    path: '/matrix',
    title: 'Matrix Chat',
    component: Matrix,
    requiresAuthentication: true
  })
  addPage({
    path: '/profile',
    title: 'Profile',
    component: Profile,
    requiresAuthentication: true
  })
  addPage({
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

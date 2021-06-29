import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseContext, FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';

const MainDocument = () => {
  const { currentUser } = useContext(FirebaseContext);
  return (
    <Router>
      <div className={`App`}>
        <NavBar />
        <div className={`content`}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/auth'>
              <Authentication logout={!!currentUser} />
            </Route>
            <Route exact path='/WebRTC'>
              <WebRTC />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

function App() {
  return (
    <FirebaseProvider>
      <WebRtcProvider>
        <MainDocument />
      </WebRtcProvider>
    </FirebaseProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';

const MainDocument = () => {
  return (
    <Router>
      <div className={`App`}>
        <NavBar />
        <div className={`content`}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/logout'>
              <Authentication logout={true} />
            </Route>
            <Route exact path='/auth'>
              <Authentication />
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

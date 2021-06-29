import { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseContext, FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';
import { DrawerExample } from './pages/DrawerExample'

const MainDocument = () => {
  const { currentUser } = useContext(FirebaseContext);
  return (
    <Router>
      <div className={`App`}>
        <NavBar />
        <div className={`content`}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth'>
              {
                (props) => <Authentication logout={!!currentUser} {...props} />
              }              
            </Route>
            <Route exact path='/WebRTC' component={WebRTC} />
            <Route exact path='/about' component={About} />
            <Route exact path='/example' component={DrawerExample} />
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

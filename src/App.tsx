import { useContext } from 'react';
import { BrowserRouter as Router, RouteProps, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About, Authentication } from './pages'
import { NavBar } from './components'
import { FirebaseContext, FirebaseProvider } from './database/FirebaseContext'
import { WebRtcProvider } from './matrix/WebRtcContext';
import { NavigationContext, NavigationProvider } from './navigation/NavigationContext';

const MainDocument = () => {
  const { currentUser } = useContext(FirebaseContext);
  const { registerTitle } = useContext(NavigationContext)

  registerTitle('/', 'Home')
  registerTitle('/auth', 'Cloud Lightning')
  registerTitle('/about', 'About')
  registerTitle('/WebRTC', 'WebRTC')
  registerTitle('/example', 'Playground')

  return (
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
        </Switch>
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

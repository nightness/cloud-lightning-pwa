import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About } from './pages'
import { NavBar } from './components'

function App() {
  return (
      <Router>
        <div className={`App`}>
          <NavBar />
          <div className={`content`}>
            <Switch>
              <Route exact path='/'>
                <Home />
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
  );
}

export default App;

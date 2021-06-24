import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { Home, WebRTC, About } from './pages'
import { NavBar } from './components'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'ABC'
  }, []);
  
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

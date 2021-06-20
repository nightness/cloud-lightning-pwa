import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import { themes } from './Themes'
import './App.css';
import { Home, WebRTC } from './pages'
import { NavBar } from './components'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './FirebaseInit'

function App() {
  return (
    <ThemeProvider themes={themes}>
      <Router>
        <Container className={`App`}>
          <NavBar />
          <Container className={`content`}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/webRTC'>
                <WebRTC />
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

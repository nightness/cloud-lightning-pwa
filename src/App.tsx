import React, { useEffect, useRef, useState, MouseEvent, CSSProperties, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import { themes } from './Themes'
import './App.css';
import firebase from 'firebase'
import WebRTC from './pages/WebRTC'
import Home from './pages/Home'
import { NavBar, Container } from './components'

const firebaseConfig = {
  apiKey: "AIzaSyA0QwzJ1I_i4w-jO-9Vk1W5YKHFAyVSal4",
  authDomain: "cloud-lightning-lite.firebaseapp.com",
  projectId: "cloud-lightning-lite",
  storageBucket: "cloud-lightning-lite.appspot.com",
  messagingSenderId: "607208296062",
  appId: "1:607208296062:web:17cfe68400f2a65ddcd22f",
  measurementId: "G-R55E0ZP42N"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
}

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

import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CssBaseline } from '@material-ui/core';

import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SingleGroup from './components/SingleGroup';

function App() {
  const [user, setUser] = React.useState(null);

  const handleUser = (currUser) => {
    setUser(currUser);
  }

  return (
    <>
      {
        (user !== null) && (<>
          <CssBaseline />
          <Navbar handleUser={handleUser} />
        </>)
      }
      <Router>
        <Routes>
          {
            user !== null ? (
              <>
                <Route path='/' exact element={<LandingPage />} />
                <Route path='/memory/:groupId' element={<SingleGroup />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path='/login' exact element={<Login handleUser={handleUser} />} />
                <Route path='/register' exact element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )
          }
        </Routes>
      </Router>
    </>
  )
}

export default App;

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            path="/profile"
            render={() => (
              <Profile />
            )}
          />
          <Route
            path="/dialogs"
            render={() => (
              <DialogsContainer />
            )}
          />
          <Route path="/news" component={News} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

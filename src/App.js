import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            path="/profile"
            render={() => (
              <Profile
                profilePage={props.state.profilePage}
                updateNewPostText={props.updateNewPostText}
                addPost={props.addPost}
              />
            )}
          />
          <Route
            path="/dialogs"
            render={() => <Dialogs dialogsPage={props.state.dialogsPage} />}
          />
          <Route path="/news" component={News} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/appReducerTS.ts';
import Preloader from './components/Common/Preloader';

function App() {
  const initialized = useSelector((s) => s.app.initialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);
  return (<div>
    {!initialized
    ? <Preloader />
    : <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route exact path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/news" component={News} />
          <Route path="/users" render={() => <UsersContainer pageTitle={"Пользователи"} />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    </BrowserRouter>}
  </div>);
}

export default App;

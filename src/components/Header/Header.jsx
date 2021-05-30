import React from 'react'
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import s from "./Header.module.css";
import { logout } from "../../redux/authReducer";

const Header = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={s.header}>
      <header className={s.header1}>
        <img
          src="https://pngimage.net/wp-content/uploads/2018/06/flowers-logo-png-6.png"
          alt="default-logo"
        />
      </header>
      <div className={s.header2}>Header text</div>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
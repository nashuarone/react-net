import React from 'react'
import { NavLink } from 'react-router-dom';
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <a href="s.com">Music</a>
      </div>
      <div className={s.item}>
        <a href="s.com">Settings</a>
      </div>
      <div className={s.friends}>
        <h3>Friends</h3>
        <div className={s.friendsblock}>
          <div>
            <img
              src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
              alt=""
            />
            <p>Pups</p>
          </div>
          <div>
            <img
              src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
              alt=""
            />
            <p>Keks</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
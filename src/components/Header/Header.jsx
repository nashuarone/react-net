import React from 'react'
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.header}>
      <header className={s.header1}>
        <img
          src="https://pngimage.net/wp-content/uploads/2018/06/flowers-logo-png-6.png"
          alt="default-logo"
        />
      </header>
      <div className={s.header2}>Header text</div>
    </div>
  );
}

export default Header;
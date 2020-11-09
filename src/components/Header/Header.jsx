import React from 'react'
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.header}>
      <header className={s.header1}>
        <img
          src="https://c7.hotpng.com/preview/308/294/538/slack-technologies-logo-privately-held-company-others-thumbnail.jpg"
          alt="default-logo"
        />
      </header>
      <div className={s.header2}>Header text</div>
    </div>
  );
}

export default Header;
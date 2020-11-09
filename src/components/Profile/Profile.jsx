import React from 'react'
import Posts from './Posts/Posts';
import s from "./Profile.module.css";


const Profile = () => {
  return (
    <div>
      <div className={s.picture}>
        <img
          src="https://www.pics4learning.com/images/pics-banner1-1300.jpg"
          alt=""
        />
      </div>
      <div>ava + discription</div>
      <Posts />
    </div>
  );
};

export default Profile;
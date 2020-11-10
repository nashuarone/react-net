import React from 'react'
import Posts from './Posts/Posts';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = () => {
  return (
    <div>
      <ProfileImg />
      <div className={s.leftPad}>
        <ProfileInfo />
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
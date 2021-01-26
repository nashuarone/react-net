import React from 'react'
import PostsContainer from './Posts/PostsContainer';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = () => {
  return (
    <div>
      <ProfileImg />
      <div className={s.leftPad}>
        <ProfileInfo />
        <PostsContainer />
      </div>
    </div>
  );
};

export default Profile;
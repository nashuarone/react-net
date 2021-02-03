import React from 'react'
import PostsContainer from './Posts/PostsContainer';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
  return (
    <div>
      <ProfileImg />
      <div className={s.leftPad}>
        <ProfileInfo {...props} />
        <PostsContainer />
      </div>
    </div>
  );
};

export default Profile;
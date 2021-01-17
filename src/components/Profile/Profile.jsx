import React from 'react'
import Posts from './Posts/Posts';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
  return (
    <div>
      <ProfileImg />
      <div className={s.leftPad}>
        <ProfileInfo />
        <Posts
          postsData={props.profilePage.postsData}
          newPostText={props.profilePage.newPostText}
          updateNewPostText={props.updateNewPostText}
          addPost={props.addPost}
        />
      </div>
    </div>
  );
};

export default Profile;
import React from 'react'
import { ProfileType } from '../../types/types';
import PostsContainer from './Posts/PostsContainer';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  profile: ProfileType | null;
  status: string | null;
  currentUserId: number | null;
  isOwner: boolean;
  isAuth: boolean;
  savePhoto: (photoFile: any) => void;
  updateUserStatus: (status: string) => void;
};

const Profile: React.FC<PropsType> = (props) => {
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
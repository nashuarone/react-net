import React, { ChangeEvent } from "react";
//import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ProfileType } from "../../../types/types";
import Preloader from "../../Common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProflleStatus";

type PropsType = {
  profile: ProfileType | null;
  status: string | null;
  currentUserId: number | null;
  isOwner: boolean;
  isAuth: boolean;
  savePhoto: (photoFile: any) => void;
  updateUserStatus: (status: string) => void;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  if (!props.isAuth) {
    return <Redirect to={"/login"} />;
  }
  if (!props.profile) {
    return <Preloader />;
  }
  const handlePhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div className={s.discription}>
      <div>
        <img alt="ava" src={props.profile.photos.large} />
      </div>
      <div>
        {props.isOwner && <input type="file" onChange={handlePhotoSelect} />}
      </div>
      <div>
        <ProfileStatus
          {...props}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      </div>
      ava + discription
    </div>
  );
};

export default ProfileInfo;

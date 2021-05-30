import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Preloader from "../../Common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProflleStatus";

const ProfileInfo = (props) => {
  const isAuth = useSelector((s) => s.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={"/login"} />;
  }
  if (!props.profile) {
    return <Preloader />
  }
  const handlePhotoSelect = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  return (
    <div className={s.discription}>
      <div>
        <img alt="ava" src={props.profile.photos.large} />
      </div>
      <div>
        {props.isOwner && <input type="file" onChange={handlePhotoSelect} />}
      </div>
      <div>
        <ProfileStatus {...props} status={props.status} />
      </div>
      ava + discription
    </div>
  );
};

export default ProfileInfo;

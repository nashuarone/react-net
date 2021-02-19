import React from "react";
import Preloader from "../../Common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProflleStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.discription}>
      <div>
        <img alt="ava" src={props.profile.photos.large} />
      </div>
      <div>
        <ProfileStatus {...props} status={props.status} />
      </div>
      ava + discription
    </div>
  );
};

export default ProfileInfo;

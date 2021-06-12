import React from 'react'
import s from "./Post.module.css";

type PropsType = {
  likesCount: number
  message: string
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
        alt=""
      />
      {props.message}
      <div>{props.likesCount}</div>
    </div>
  );
};

export default Post;
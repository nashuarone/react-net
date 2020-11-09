import React from 'react'
import Post from './Post/Post';
import s from "./Posts.module.css";


const Posts = () => {
  return (
    <div>
      My posts
      <div className={s.posts}>
        <textarea></textarea>
        <button>Create post</button>
      </div>
      <div>
        <Post message="first post" count="15" />
        <Post message="Give me more likes" count="23" />
        <Post />
      </div>
    </div>
  );
};

export default Posts;
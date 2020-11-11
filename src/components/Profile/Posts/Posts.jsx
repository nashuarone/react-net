import React from 'react'
import Post from './Post/Post';
import s from "./Posts.module.css";


const Posts = () => {

  let postsData = [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ];

  let postElements = postsData.map((it) => (
    <Post message={it.message} likesCount={it.likesCount} />
  ));

  return (
    <div>
      <h3>My posts</h3>
      <div className={s.posts}>
        <textarea></textarea>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={s.postBlock}>
        {postElements}
      </div>
    </div>
  );
};

export default Posts;
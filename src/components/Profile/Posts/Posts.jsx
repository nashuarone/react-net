import React from 'react'
import Post from './Post/Post';
import s from "./Posts.module.css";


const Posts = () => {

  let postsData = [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ];

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
        <Post
          message={postsData[0].message}
          likesCount={postsData[0].likesCount}
        />
        <Post
          message={postsData[1].message}
          likesCount={postsData[1].likesCount}
        />
        <Post
          message={postsData[2].message}
          likesCount={postsData[2].likesCount}
        />
      </div>
    </div>
  );
};

export default Posts;
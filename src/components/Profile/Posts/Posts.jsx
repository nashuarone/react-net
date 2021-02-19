import React from 'react'
import { Field, reduxForm } from 'redux-form';
import Post from './Post/Post';
import s from "./Posts.module.css";

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.posts}>
      <Field
        placeholder={"Ща запощу чё-нить..."}
        name={"newPostText"}
        component={"textarea"}
      ></Field>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
}

const PostReduxForm = reduxForm({
  form: "WallPost",
})(PostForm);

const Posts = (props) => {

  // let postsData = [
  //   { id: 1, message: "first post!", likesCount: 12 },
  //   { id: 2, message: "Give me more likes", likesCount: 23 },
  //   { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 }
  // ];

  let postElements = props.postsData.map((it) => (
    <Post message={it.message} likesCount={it.likesCount} />
  ));

  // let newTextElement = React.createRef();
  // let addPostUI = () => {
  //   props.addPost();
  //   //props.dispatch(addPostActionCreator());
  // }
  // let newPostUI = () => {
  //   let postMessageUI = newTextElement.current.value;
  //   //props.updateNewPostText(postMessageUI);
  //   props.newPost(postMessageUI);
  // }

  let addPostRF = (PostText) => {
    props.addPost(PostText.newPostText);
  };

  return (
    <div>
      <h3>My posts</h3>
      <PostReduxForm onSubmit={addPostRF} />
      <div className={s.postBlock}>{postElements}</div>
    </div>
  );
};

export default Posts;
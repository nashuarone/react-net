import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostType } from '../../../types/types';
import Post from './Post/Post';
import s from "./Posts.module.css";

type PropsType = {}
export type MapStatePropsType = {
  postsData: Array<PostType>
};
export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};
type AddPostFormValuesType = {
  newPostText: string;
};

const PostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
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
};

const PostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({
  form: "WallPost",
})(PostForm);

const Posts: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  let postElements = props.postsData.map((it) => (
    <Post message={it.message} likesCount={it.likesCount} />
  ));

  let addPostRF = (PostText: AddPostFormValuesType) => {
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
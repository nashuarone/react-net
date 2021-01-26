import React from "react";
import Posts from "./Posts";
import {
  updateNewPostTextActionCreator,
  addPostActionCreator,
} from "../../../redux/profileReducer";
import StoreContext from "../../../StoreContext";

const PostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {
        store => {
          let state = store.getState();

          let addPost = () => {
            store.dispatch(addPostActionCreator());
          };

          let newPost = (postMessage) => {
            let action = updateNewPostTextActionCreator(postMessage);
            store.dispatch(action);
          };
          return <Posts
            newPost={newPost}
            addPost={addPost}
            postsData={state.profilePage.postsData}
            newPostText={state.profilePage.newPostText}
          />
        }
      }
    </StoreContext.Consumer>
  );
};

export default PostsContainer;

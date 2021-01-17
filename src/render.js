import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { state, addPost, updateNewPostText } from "./redux/state";

export let rerenderEntireTree = (props) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

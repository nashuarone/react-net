import { rerenderEntireTree } from "../render";

export let state = {
  profilePage: {
    postsData: [
      { id: 1, message: "first post!", likesCount: 12 },
      { id: 2, message: "Give me more likes", likesCount: 23 },
      { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 }
    ],
    newPostText: 'Pupiiiiiiii'
  },
  dialogsPage: {
    dialogsData: [
      { id: 1, name: "Pupsik" },
      { id: 2, name: "Baby" },
      { id: 3, name: "Alyosha" },
    ],
    messagesData: [
      { id: 1, message: "Hi, edreniy!" },
      { id: 2, message: "How are you???" },
    ]
  }
};

window.state = state;

export let addPost = () => {
  let newPost = {
    id: 4,
    message: state.profilePage.newPostText,
    likesCount: 0
  };
  state.profilePage.postsData.push(newPost)
  state.profilePage.newPostText = "";
  // debugger
  rerenderEntireTree(state);
}

export let updateNewPostText = (text) => {
  state.profilePage.newPostText = text;
  // debugger
  rerenderEntireTree(state);
};

// export default state

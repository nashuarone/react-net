import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

// const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
// const SEND_MESSAGE = "SEND-MESSAGE";
// const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let store = {
  _state: {
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
    ],
    newMessageText: ''
  }
  },
  _callSubscriber() {
    console.log('do you need state?')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  /* Можно сделать методы приватными и вызывать их внутри диспатча для сокращения кода
  addPost() {
    let newPost = {
      id: 4,
      message: this._state.profilePage.newPostText,
      likesCount: 0,
    };
    this._state.profilePage.postsData.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
  },
  updateNewPostText(text) {
    this._state.profilePage.newPostText = text;
    this._callSubscriber(this._state);
  },*/
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state);

    /* if (action.type === ADD_POST) {
      let newPost = {
        id: 4,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.postsData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.text;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let newMessage = {
        id: 3,
        message: this._state.dialogsPage.newMessageText,
      };
      this._state.dialogsPage.messagesData.push(newMessage);
      this._state.dialogsPage.newMessageText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_MESSAGE_TEXT) {
      this._state.dialogsPage.newMessageText = action.message;
      this._callSubscriber(this._state);
    } */
  }
}

// export const addPostActionCreator = () => ({ type: ADD_POST });

// export const updateNewPostTextActionCreator = (postMessageUI) => ({
//   type: UPDATE_NEW_POST_TEXT,
//   text: postMessageUI,
// });

// export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

// export const updateMessageTextActionCreator = (newMessageUI) => ({
//   type: UPDATE_MESSAGE_TEXT,
//   message: newMessageUI,
// });

window.store = store;

export default store

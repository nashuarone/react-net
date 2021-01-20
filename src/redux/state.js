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
    ]
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
  },
  dispatch(action) {
    if (action.type === 'ADD-POST') {
      let newPost = {
        id: 4,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.postsData.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
      this._state.profilePage.newPostText = action.text;
      this._callSubscriber(this._state);
    }
  }
}

window.store = store;

export default store

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ],
  newPostText: "Pupiiiiiiii",
};

const profileReducer = (state_p = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 4,
        message: state_p.newPostText,
        likesCount: 0,
      };
      state_p.postsData.push(newPost);
      state_p.newPostText = "";
      return state_p;
    case UPDATE_NEW_POST_TEXT:
      state_p.newPostText = action.text;
      return state_p;
    default:
      return state_p;
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (postMessageUI) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: postMessageUI,
});

export default profileReducer;

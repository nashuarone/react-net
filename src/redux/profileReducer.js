const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileReducer = (state_p, action) => {
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

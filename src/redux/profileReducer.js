import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

let initialState = {
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ],
  profile: null,
  status: ""
};

const profileReducer = (state_p = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: action.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state_p };
      stateCopy.postsData = [...state_p.postsData];
      stateCopy.postsData.push(newPost);
      return stateCopy;
    }
    case SET_USER_PROFILE:
      return { ...state_p, profile: action.profile };
    case SET_USER_STATUS:
      return { ...state_p, status: action.status };
    default:
      return state_p;
  }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((res) => {
    dispatch(setUserProfile(res.data));
  });
};
export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((res) => {
    dispatch(setUserStatus(res.data));
  });
};
export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  });
};

export default profileReducer;

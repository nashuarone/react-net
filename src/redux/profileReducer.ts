import { profileAPI } from "../api/profile-api";
import { ResultCodeEnum } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const ADD_POST = "SN/PROFILE/ADD-POST";
const SET_USER_PROFILE = "SN/PROFILE/SET_USER_PROFILE";
const SET_USER_STATUS = "SN/PROFILE/SET_USER_STATUS";
const SAVE_PHOTO_SUCSESS = "SN/PROFILE/SAVE_PHOTO_SUCSESS";

let initialState = {
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

const profileReducer = (state_p = initialState, action: ActionTypes): InitialStateType => {
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
    case SAVE_PHOTO_SUCSESS:
      return {
        ...state_p,
        profile: { ...state_p.profile, photos: action.photos } as ProfileType,
      };
    default:
      return state_p;
  }
};

export const actions = {
  addPost: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile,
  } as const),
  setUserStatus: (status: string) => ({
    type: SET_USER_STATUS,
    status,
  } as const),
  savePhotoSucsess: (photos: PhotosType) => ({
    type: SAVE_PHOTO_SUCSESS,
    photos,
  } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  profileAPI.getProfile(userId).then((data) => {
    dispatch(actions.setUserProfile(data));
  });
};
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  profileAPI.getStatus(userId).then((status) => {
    dispatch(actions.setUserStatus(status));
  });
};
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  profileAPI.updateStatus(status).then((data) => {
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(actions.setUserStatus(status));
    }
  });
};
export const savePhoto = (photoFile: any): ThunkType => async (dispatch) => {
  profileAPI.savePhoto(photoFile).then((data) => {
    dispatch(actions.savePhotoSucsess(data.data.photos));
  });
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>;

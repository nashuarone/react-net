import { profileAPI } from "../api/profile-api";
import { ResultCodeEnum } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCSESS = "SAVE_PHOTO_SUCSESS";

let initialState = {
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (state_p = initialState, action: any) => {
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
        profile: { ...state_p.profile, photos: action.photos },
      };
    default:
      return state_p;
  }
};

type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): addPostActionCreatorType => ({ type: ADD_POST, newPostText });
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
type SetUserStatusType = {
  type: typeof SET_USER_STATUS;
  status: string;
};
export const setUserStatus = (status: string): SetUserStatusType => ({
  type: SET_USER_STATUS,
  status,
});
type SavePhotoSucsessType = {
  type: typeof SAVE_PHOTO_SUCSESS;
  photos: PhotosType;
};
export const savePhotoSucsess = (photos: PhotosType): SavePhotoSucsessType => ({
  type: SAVE_PHOTO_SUCSESS,
  photos,
});

export const getUserProfile = (userId: number) => (dispatch: any) => {
  profileAPI.getProfile(userId).then((data) => {
    dispatch(setUserProfile(data));
  });
};
export const getUserStatus = (userId: number) => (dispatch: any) => {
  profileAPI.getStatus(userId).then((status) => {
    dispatch(setUserStatus(status));
  });
};
export const updateUserStatus = (status: string) => (dispatch: any) => {
  profileAPI.updateStatus(status).then((data) => {
    if (data.resultCode === ResultCodeEnum.Success) {
      dispatch(setUserStatus(status));
    }
  });
};
export const savePhoto = (photoFile: any) => (dispatch: any) => {
  profileAPI.savePhoto(photoFile).then((data) => {
    dispatch(savePhotoSucsess(data.data.photos));
  });
};

export default profileReducer;

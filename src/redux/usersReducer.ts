//import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { AppStateType } from "./reduxStore";

const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_BUTTONS = "TOGGLE_IS_FOLLOWING_BUTTONS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowFetching: [] as Array<number> //array of users ids
};

export type InitialStateType = typeof initialState

const userReducer = (state_u = initialState, action: ActionTypes) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state_u,
        users: state_u.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state_u,
        users: state_u.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      return {
        ...state_u,
        users: action.users,
        //users: [...state_u.users, ...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state_u,
        currentPage: action.pageNumber,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state_u,
        totalCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state_u,
        isFetching: action.fetchingStatus,
      };
    case TOGGLE_IS_FOLLOWING_BUTTONS:
      return {
        ...state_u,
        isFollowFetching: action.fetchingButtonStatus
          ? [...state_u.isFollowFetching, action.userId]
          : state_u.isFollowFetching.filter(id => id !== action.userId)
      };
    default:
      return state_u;
  }
}

type ActionTypes = FollowSuccesActionType
  | UnfollowSuccesActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleIsFetchingActionType
  | ToggleIsFollowingButtonsActionType

type FollowSuccesActionType = {
  type: typeof FOLLOW;
  userId: number
};
export const followSucces = (userId: number): FollowSuccesActionType => ({
  type: FOLLOW,
  userId,
});
type UnfollowSuccesActionType = {
  type: typeof UNFOLLOW;
  userId: number
};
export const unfollowSucces = (userId: number): UnfollowSuccesActionType => ({
  type: UNFOLLOW,
  userId,
});
type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  pageNumber: number;
};
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalCount: number;
};
export const setTotalUsersCount = (
  totalCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  fetchingStatus: boolean;
};
export const toggleIsFetching = (
  fetchingStatus: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  fetchingStatus,
});
type ToggleIsFollowingButtonsActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_BUTTONS,
  fetchingButtonStatus: boolean
  userId: number
}
export const toggleIsFollowingButtons = (
  fetchingButtonStatus: boolean,
  userId: number
): ToggleIsFollowingButtonsActionType => ({
  type: TOGGLE_IS_FOLLOWING_BUTTONS,
  fetchingButtonStatus,
  userId,
});

// type GetStateType = () => AppStateType;
// type DispatchType = Dispatch<ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsers = (pageNm: number, pageSz: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNm));
    usersAPI.getUsers(pageNm, pageSz).then((data: any) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};
export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingButtons(true, userID));
    usersAPI.follow(userID).then((res: any) => {
      dispatch(toggleIsFollowingButtons(false, userID))
      if (res.data.resultCode === 0) {
        dispatch(followSucces(userID))
      }
    });
  }
};
export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingButtons(true, userID));
    usersAPI.unfollow(userID).then((res: any) => {
      dispatch(toggleIsFollowingButtons(false, userID));
      if (res.data.resultCode === 0) {
        dispatch(unfollowSucces(userID));
      }
    });
  };
};

export default userReducer;

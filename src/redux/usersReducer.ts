//import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/users-api";
import { ResultCodeEnum } from "../api/api";
import { UserType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./reduxStore";

const UNFOLLOW = "SN/USERS/UNFOLLOW";
const FOLLOW = "SN/USERS/FOLLOW";
const SET_USERS = "SN/USERS/SET_USERS";
const SET_CURRENT_PAGE = "SN/USERS/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SN/USERS/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "SN/USERS/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_BUTTONS = "SN/USERS/TOGGLE_IS_FOLLOWING_BUTTONS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowFetching: [] as Array<number> //array of users ids
};

export type InitialStateType = typeof initialState

const userReducer = (
  state_u = initialState,
  action: ActionTypes
): InitialStateType => {
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
          : state_u.isFollowFetching.filter((id) => id !== action.userId),
      };
    default:
      return state_u;
  }
};

type ActionTypes = InferActionsTypes<typeof actions>

const actions = {
  followSucces: (userId: number) => ({ type: FOLLOW, userId } as const),
  unfollowSucces: (userId: number) => ({ type: UNFOLLOW, userId } as const),
  setUsers: (users: Array<UserType>) => ({
    type: SET_USERS,
    users,
  } as const),
  setCurrentPage: (pageNumber: number) => ({
    type: SET_CURRENT_PAGE,
    pageNumber,
  } as const),
  setTotalUsersCount: (totalCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount,
  } as const),
  toggleIsFetching: (fetchingStatus: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    fetchingStatus,
  } as const),
  toggleIsFollowingButtons: (
    fetchingButtonStatus: boolean,
    userId: number
  ) => ({ type: TOGGLE_IS_FOLLOWING_BUTTONS, fetchingButtonStatus, userId } as const),
};

// type GetStateType = () => AppStateType;
// type DispatchType = Dispatch<ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsers = (pageNm: number, pageSz: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(pageNm));
    usersAPI.getUsers(pageNm, pageSz).then((data) => {
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
    });
  };
};
export const follow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingButtons(true, userID));
    usersAPI.follow(userID).then((data) => {
      dispatch(actions.toggleIsFollowingButtons(false, userID))
      if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.followSucces(userID))
      }
    });
  }
};
export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingButtons(true, userID));
    usersAPI.unfollow(userID).then((res: any) => {
      dispatch(actions.toggleIsFollowingButtons(false, userID));
      if (res.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.unfollowSucces(userID));
      }
    });
  };
};

export default userReducer;

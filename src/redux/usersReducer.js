import { usersAPI } from "../api/api";

const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_BUTTONS = "TOGGLE_IS_FOLLOWING_BUTTONS";

let initialState = {
  users: [],
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowFetching: []
};

const userReducer = (state_u = initialState, action) => {
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

export const followSucces = (userId) => ({ type: FOLLOW, userId });
export const unfollowSucces = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber });
export const setTotalUsersCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});
export const toggleIsFetching = (fetchingStatus) => ({
  type: TOGGLE_IS_FETCHING,
  fetchingStatus,
});
export const toggleIsFollowingButtons = (fetchingButtonStatus, userId) => ({
  type: TOGGLE_IS_FOLLOWING_BUTTONS,
  fetchingButtonStatus,
  userId
});

export const getUsers = (pageNm, pageSz) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(pageNm))
    usersAPI.getUsers(pageNm, pageSz).then((data) => {
      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
    });
  }
}

export const follow = (userID) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingButtons(true, userID));
    usersAPI.follow(userID).then((res) => {
      dispatch(toggleIsFollowingButtons(false, userID))
      if (res.data.resultCode === 0) {
        dispatch(followSucces(userID))
      }
    });
  }
};

export const unfollow = (userID) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingButtons(true, userID));
    usersAPI.unfollow(userID).then((res) => {
      dispatch(toggleIsFollowingButtons(false, userID));
      if (res.data.resultCode === 0) {
        dispatch(unfollowSucces(userID));
      }
    });
  };
};

export default userReducer;

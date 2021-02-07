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

export const follow = (userId) => ({ type: FOLLOW, userId });

export const unfollow = (userId) => ({
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

export default userReducer;

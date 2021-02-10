import { authAPI } from "../api/api";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: true
};

const authReducer = (state_a = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state_a,
        ...action.data,
        isAuth: true
      };
    default:
      return state_a;
  }
}

export const setUserAuthData = (userId, email, login) => ({
  type: SET_USER_AUTH_DATA,
  data: {userId, email, login},
});

export const getUserAuthData = () => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      let { id, email, login } = res.data.data;
      dispatch(setUserAuthData(id, email, login))
    }
  });
}

export default authReducer;

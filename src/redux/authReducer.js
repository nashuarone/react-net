import { authAPI } from "../api/api";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";
const TOGGLE_IS_LOGIN_BUTTON = "TOGGLE_IS_LOGIN_BUTTON";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false
};

const authReducer = (state_a = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state_a,
        ...action.payload,
      };
    case TOGGLE_IS_LOGIN_BUTTON:
      return {
        ...state_a,
        isLoginFetching: action.fetchingStatus,
      };
    default:
      return state_a;
  }
}

export const setUserAuthData = (userId, email, login, isAuth) => ({
  type: SET_USER_AUTH_DATA,
  payload: { userId, email, login, isAuth },
});
export const toggleIsLoginButton = (fetchingStatus) => ({
  type: TOGGLE_IS_LOGIN_BUTTON,
  fetchingStatus,
});

export const getUserAuthData = () => (dispatch) => {
  return authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      let { id, email, login } = res.data.data;
      dispatch(setUserAuthData(id, email, login, true))
    }
  });
}
export const login = (email, password, rememberMe) => (dispatch) => {
  dispatch(toggleIsLoginButton(true));
  authAPI.login(email, password, rememberMe).then((res) => {
    dispatch(toggleIsLoginButton(false));
    if (res.data.resultCode === 0) {
      dispatch(getUserAuthData());
    } else {
      alert("email или пароль не совпадают")
    }
  });
};
export const logout = () => (dispatch) => {
  dispatch(toggleIsLoginButton(true));
  authAPI.logout().then((res) => {
    dispatch(toggleIsLoginButton(false));
    if (res.data.resultCode === 0) {
      dispatch(setUserAuthData(null, null, null, false));
    }
  });
};

export default authReducer;

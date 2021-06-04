import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/api";
import { AppStateType } from "./reduxStore";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";
const TOGGLE_IS_LOGIN_BUTTON = "TOGGLE_IS_LOGIN_BUTTON";

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  isFetching: boolean;
};

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};

const authReducer = (
  state_a = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state_a,
        ...action.payload,
      };
    case TOGGLE_IS_LOGIN_BUTTON:
      return {
        ...state_a,
        isFetching: action.fetchingStatus,
      };
    default:
      return state_a;
  }
};

type ActionTypes = SetUserAuthDataActionType | toggleIsLoginButtonActionType

type SetUserAuthDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean;
};
type SetUserAuthDataActionType = {
  type: typeof SET_USER_AUTH_DATA;
  payload: SetUserAuthDataActionPayloadType;
};
export const setUserAuthData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetUserAuthDataActionType => ({
  type: SET_USER_AUTH_DATA,
  payload: { userId, email, login, isAuth },
});
type toggleIsLoginButtonActionType = {
  type: typeof TOGGLE_IS_LOGIN_BUTTON;
  fetchingStatus: boolean
};
export const toggleIsLoginButton = (
  fetchingStatus: boolean
): toggleIsLoginButtonActionType => ({
  type: TOGGLE_IS_LOGIN_BUTTON,
  fetchingStatus,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserAuthData = (): ThunkType => (dispatch) => {
  return authAPI.me().then((res: any) => {
    if (res.data.resultCode === 0) {
      let { id, email, login } = res.data.data;
      dispatch(setUserAuthData(id, email, login, true));
    }
  });
};
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsLoginButton(true));
    authAPI.login(email, password, rememberMe).then((res: any) => {
      dispatch(toggleIsLoginButton(false));
      if (res.data.resultCode === 0) {
        dispatch(getUserAuthData());
      } else {
        alert("email или пароль не совпадают");
      }
    });
  };
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsLoginButton(true));
    authAPI.logout().then((res: any) => {
      dispatch(toggleIsLoginButton(false));
      if (res.data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
      }
    });
  };
}

export default authReducer;

import { authAPI } from "../api/auth-api";
import { ResultCodeEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const SET_USER_AUTH_DATA = "SN/AUTH/SET_USER_AUTH_DATA";
const TOGGLE_IS_LOGIN_BUTTON = "SN/AUTH/TOGGLE_IS_LOGIN_BUTTON";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
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

// type SetUserAuthDataActionPayloadType = {
//   userId: number | null
//   email: string | null
//   login: string | null
//   isAuth: boolean;
// };

const actions = {
  setUserAuthData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => ({
    type: SET_USER_AUTH_DATA,
    payload: { userId, email, login, isAuth },
  } as const),
  toggleIsLoginButton: (fetchingStatus: boolean) => ({
    type: TOGGLE_IS_LOGIN_BUTTON,
    fetchingStatus,
  } as const),
}

export const getUserAuthData = (): ThunkType => async (dispatch) => {
  return authAPI.me().then((meData) => {
    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, email, login } = meData.data;
      dispatch(actions.setUserAuthData(id, email, login, true));
    }
  });
};
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsLoginButton(true));
    authAPI.login(email, password, rememberMe).then((data) => {
      dispatch(actions.toggleIsLoginButton(false));
      if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserAuthData());
      } else {
        alert("email или пароль не совпадают");
      }
    });
  };
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsLoginButton(true));
    authAPI.logout().then((res) => {
      dispatch(actions.toggleIsLoginButton(false));
      if (res.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserAuthData(null, null, null, false));
      }
    });
  };
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;

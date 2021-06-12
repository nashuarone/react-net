import { getUserAuthData } from "./authReducer";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const SET_INITIALIZED = "SN/APP/SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (
  state_a = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state_a,
        initialized: true,
      };
    default:
      return state_a;
  }
};

export const actions = {
  setInitialized: () => ({type: SET_INITIALIZED}),
}

export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    let promise = dispatch(getUserAuthData());
    promise.then(() => {
      dispatch(actions.setInitialized());
    });
  };
};

export default appReducer

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

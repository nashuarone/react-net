import { ThunkAction } from "redux-thunk";
import { getUserAuthData } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";

const SET_INITIALIZED = "SN/APP/SET_INITIALIZED";

let initialState = {
  initialized: false,
};
export type InitialStateType = typeof initialState

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

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  setInitialized: () => ({type: SET_INITIALIZED}),
}

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    let promise = dispatch(getUserAuthData());
    promise.then(() => {
      dispatch(actions.setInitialized());
    });
  };
}

export default appReducer;

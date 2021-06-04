import { ThunkAction } from "redux-thunk";
import { getUserAuthData } from "./authReducer";
import { AppStateType } from "./reduxStore";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
  initialized: boolean,
};

let initialState: InitialStateType = {
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

type ActionTypes = SetInitializedActionType

type SetInitializedActionType = {
  type: typeof SET_INITIALIZED;
};
export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    let promise = dispatch(getUserAuthData());
    promise.then(() => {
      dispatch(setInitialized());
    });
  };
}

export default appReducer;

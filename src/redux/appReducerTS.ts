import { getUserAuthData } from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
  initialized: boolean,
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducerTS = (state_a = initialState, action: any): InitialStateType => {
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

type SetInitializedActionType = {
  type: typeof SET_INITIALIZED;
};

export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getUserAuthData());
  promise.then(() => {
    dispatch(setInitialized());
  });
}

export default appReducerTS;

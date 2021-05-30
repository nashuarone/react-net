import { getUserAuthData } from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state_a = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state_a,
        initialized: true,
      };
    default:
      return state_a;
  }
}

export const setInitialized = () => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getUserAuthData());
  promise.then(() => {
    dispatch(setInitialized());
  });
}

export default appReducer;

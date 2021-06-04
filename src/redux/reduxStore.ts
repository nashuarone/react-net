import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReduser from './usersReducer'
import appReducer from "./appReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReduser,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RedusersType = typeof reducers
export type AppStateType = ReturnType<RedusersType>;

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store //для дебага, потом удалить

export default store

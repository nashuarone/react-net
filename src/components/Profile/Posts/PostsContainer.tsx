import { connect } from "react-redux";
import Posts, { MapDispatchPropsType, MapStatePropsType } from "./Posts";
import {
  actions,
} from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/reduxStore";

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
  }
}

const PostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPost,
})(Posts);

export default PostsContainer;

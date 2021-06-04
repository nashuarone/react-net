import React from "react";
import { compose } from "redux";
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  getUsers
} from "../../redux/usersReducer";
import Users from './Users'
import Preloader from '../Common/Preloader'
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/reduxStore";
import { UserType } from "../../types/types";

type MapStatePropsType = {
  users: Array<UserType>
  totalCount: number
  pageSize: number
  currentPage: number
  isFollowFetching: Array<number>
  isFetching: boolean
};
type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
};
type OwnPropsType = {
  pageTitle: string
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersAPIcomponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  setPage = (pageNum: number) => {
    this.props.getUsers(pageNum, this.props.pageSize);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalCount={this.props.totalCount}
          pageSize={this.props.pageSize}
          setPage={this.setPage}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          isFollowFetching={this.props.isFollowFetching}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFollowFetching: state.usersPage.isFollowFetching,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  }),
  withAuthRedirect
)(UsersAPIcomponent);

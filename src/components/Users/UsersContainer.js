import React from "react";
import { connect } from 'react-redux'
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  toggleIsFollowingButtons
} from "../../redux/usersReducer";
import Users from './Users'
import Preloader from '../../components/Common/Preloader'
import { usersAPI } from "../../api/api";

class UsersAPIcomponent extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true)
      usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }

  setPage = (pageNum) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNum)
      usersAPI.getUsers(pageNum, this.props.pageSize).then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
      });
  };

  render() {
    return (
      <>
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
          toggleIsFollowingButtons={this.props.toggleIsFollowingButtons}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalCount: state.usersPage.totalCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFollowFetching: state.usersPage.isFollowFetching,
  };
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleIsFollowingButtons,
})(UsersAPIcomponent);

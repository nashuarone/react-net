import React from "react";
import { connect } from 'react-redux'
import {
  follow,
  unfollow,
  getUsers
} from "../../redux/usersReducer";
import Users from './Users'
import Preloader from '../../components/Common/Preloader'

class UsersAPIcomponent extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  setPage = (pageNum) => {
    this.props.getUsers(pageNum, this.props.pageSize);
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
  getUsers
})(UsersAPIcomponent);

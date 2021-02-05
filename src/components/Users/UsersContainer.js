import React from "react";
import { connect } from 'react-redux'
import * as axios from "axios";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow } from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../../components/Common/Preloader'
import { getUsers } from "../../api/api";

class UsersAPIcomponent extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true)
      getUsers(this.props.currentPage, this.props.pageSize).then((res) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(res.data.items);
        this.props.setTotalUsersCount(res.data.totalCount);
      });
  }

  setPage = (pageNum) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNum)
      getUsers(pageNum, this.props.pageSize).then((res) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(res.data.items);
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
    isFetching: state.usersPage.isFetching
  }
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching
})(UsersAPIcomponent);

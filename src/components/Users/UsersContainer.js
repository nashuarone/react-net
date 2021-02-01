import { connect } from 'react-redux'
import { followAC, setUsers, unfollowAC } from '../../redux/usersReducer'
import Users from './Users'

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsers(users))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

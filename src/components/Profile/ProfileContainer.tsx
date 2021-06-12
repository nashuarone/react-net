import React from 'react'
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Profile from './Profile'
import {
  getUserProfile, getUserStatus, savePhoto, updateUserStatus
} from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

// type MapStatePropsType = {
//   profile: ProfileType | null
//   status: string
//   currentUserId: number
//   isOwner: boolean
//   addPost: (newPostText: string) => void;
//   savePhotoSucsess: (photos: PhotosType) => void;
//   setUserProfile: (profile: ProfileType) => void;
//   setUserStatus: (status: string) => void;
// };
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  savePhoto: (photoFile: any) => void
};
type PathParamsType = {
  userId: string;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.currentUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    if (!userId) {
      console.error("ID should exist in params or state")
    } else {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }

  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    //if (!this.props.isAuth) return <Redirect to='/login' />
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  currentUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

// for connect <MapStatePropsType, MapDispatchPropsType, {}, AppStateType>

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

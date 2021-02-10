import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  sendMessageActionCreator,
  updateMessageTextActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from './Dialogs'
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    newMessageText: state.dialogsPage.newMessageText,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newMessage: (body) => {
      dispatch(updateMessageTextActionCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageActionCreator())
    }
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthRedirect
)(Dialogs);

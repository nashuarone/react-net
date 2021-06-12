import { compose } from "redux";
import { connect } from "react-redux";
import { actions } from "../../redux/dialogsReducer";
import Dialogs from './Dialogs'
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { DialogType, MessageType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
  dialogsData: Array<DialogType>;
  messagesData: Array<MessageType>;
  isAuth: boolean;
};
type MapDispatchPropsType = {
  sendMessage: (newDialogMessage: string) => void;
};
export type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    isAuth: state.auth.isAuth
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(
    mapStateToProps,
    {
      sendMessage: actions.sendMessage,
    }
  ),
  withAuthRedirect
)(Dialogs);

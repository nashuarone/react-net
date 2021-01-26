import React from "react";
import {
  sendMessageActionCreator,
  updateMessageTextActionCreator,
} from "../../redux/dialogsReducer";
import StoreContext from "../../StoreContext";
import Dialogs from './Dialogs'

const DialogsContainer = () => {
  return (
    <StoreContext.Consumer>
      {
        store => {
          let dialogsPage = store.getState().dialogsPage;

          let onSendMessage = () => {
            store.dispatch(sendMessageActionCreator());
          };

          let onNewMessage = (body) => {
            store.dispatch(updateMessageTextActionCreator(body));
          };
          return <Dialogs
            newMessage={onNewMessage}
            sendMessage={onSendMessage}
            dialogsData={dialogsPage.dialogsData}
            messagesData={dialogsPage.messagesData}
            newMessageText={dialogsPage.newMessageText}
          />
        }
      }
    </StoreContext.Consumer>
  );
};

export default DialogsContainer;

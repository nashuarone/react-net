import React from 'react'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'
import { sendMessageActionCreator, updateMessageTextActionCreator } from '../../redux/dialogsReducer'


const Dialogs = (props) => {

  let dialogElements = props.dialogsPage.dialogsData.map((it) => (
    <DialogItem name={it.name} id={it.id} />
  ));

  let messageElements = props.dialogsPage.messagesData.map((it) => (
    <Message message={it.message} />
  ));

  let newMessageElement = React.createRef();

  let sendMessageUI = () => {
    props.dispatch(sendMessageActionCreator())
  }

  let newMessageUI = () => {
    let newMessage = newMessageElement.current.value;
    props.dispatch(updateMessageTextActionCreator(newMessage));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <div>
          <textarea
            placeholder="Type a message..."
            onChange={newMessageUI}
            ref={newMessageElement}
            value={props.dialogsPage.newMessageText}
          ></textarea>
        </div>
        <div>
          <button onClick={sendMessageUI}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs

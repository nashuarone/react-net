import React from 'react'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'


const Dialogs = (props) => {

  let dialogElements = props.dialogsPage.dialogsData.map((it) => (
    <DialogItem name={it.name} id={it.id} />
  ));

  let messageElements = props.dialogsPage.messagesData.map((it) => (
    <Message message={it.message} />
  ));

  let newMessageElement = React.createRef();

  let sendMessage = () => {
    let newMessage = newMessageElement.current.value
    alert(newMessage)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <div>
          <textarea ref={newMessageElement}></textarea>
        </div>
        <div>
          <button onClick={sendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs

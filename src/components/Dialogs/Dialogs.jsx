import React from 'react'
import { Redirect } from "react-router-dom";
import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'
import { Field, reduxForm } from 'redux-form';

  const MessageForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            placeholder="Type a message..."
            name={"newDialogMessage"}
            component={"textarea"}
          ></Field>
        </div>
        <div>
          <button>Отправить</button>
        </div>
      </form>
    );
  };

  const MessageReduxForm = reduxForm({
    form: "Message",
  })(MessageForm);

const Dialogs = (props) => {
  let dialogElements = props.dialogsData.map((it) => (
    <DialogItem name={it.name} id={it.id} />
  ));

  let messageElements = props.messagesData.map((it) => (
    <Message message={it.message} />
  ));

  let sendMessageRF = (DialogMessage) => {
    debugger
    props.sendMessage(DialogMessage.newDialogMessage);
  };

  if (!props.isAuth) return <Redirect to='/login' />

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <MessageReduxForm onSubmit={sendMessageRF} />
      </div>
    </div>
  );
}

export default Dialogs

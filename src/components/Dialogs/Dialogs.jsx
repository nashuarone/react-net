import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id
  return (
    <div className={s.dialog}>
      <NavLink activeClassName={s.active} to={path}>
        {props.name}
      </NavLink>
    </div>
  );
}

const Message = (props) => {
return <div>{props.message}</div>
}

const Dialogs = () => {

  let dialogsData = [
    { id: 1, name: "Pupsik" },
    { id: 2, name: 'Baby'},
    { id: 3, name: 'Alyosha'}
  ];

    let messagesData = [
      { id: 1, message: "Hi, edreniy!" },
      { id: 2, message: "How are you???" }
    ];

  let dialogElements = dialogsData.map((it) => (
    <DialogItem name={it.name} id={it.id} />
  ));

  let messageElements = messagesData.map((it) => (
    <Message message={it.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>{messageElements}</div>
    </div>
  );
}

export default Dialogs
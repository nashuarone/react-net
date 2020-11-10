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

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
        <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
        <DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
      </div>
      <div className={s.messages}>
        <Message message={messagesData[0].message} />
        <Message message={messagesData[1].message} />
      </div>
    </div>
  );
}

export default Dialogs
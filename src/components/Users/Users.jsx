import React from 'react'
import { NavLink } from "react-router-dom";
import s from "./Users.module.css";
import userPhoto from '../../assets/images/userPhoto.png'

const Users = (props) => {
  let pageNumber = Math.ceil(props.totalCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pageNumber; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <button
              onClick={(e) => {
                props.setPage(p);
              }}
            >
              <span className={props.currentPage === p && s.selectedPage}>
                {p}
              </span>
            </button>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div className={s.userItem} key={u.id}>
          <div>
            <div className={s.photosize}>
              <NavLink to={'/profile/' + u.id}>
                <img
                alt="avatar"
                src={u.photos.small === null ? userPhoto : u.photos.small}
              />
              </NavLink>

            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div>
            <div>{u.name}</div>
            <div>{u.status}</div>
            <div>
              <span>{"u.location.country"}</span>,{" "}
              <span>{"u.location.city"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users

import React from 'react'
import * as axios from "axios";
import s from "./Users.module.css";
import userPhoto from '../../assets/images/userPhoto.png'

class Users extends React.Component {

  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((res) => {
        this.props.setUsers(res.data.items);
      });
  }

  render() {
    return (
      <div>
        {this.props.users.map((u) => (
          <div className={s.userItem} key={u.id}>
            <div>
              <div className={s.photosize}>
                <img
                  alt="avatar"
                  src={u.photos.small === null ? userPhoto : u.photos.small}
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
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
    )
  }
}

export default Users

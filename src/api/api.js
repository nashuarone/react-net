import * as axios from "axios";

export const getUsers = (pageNum, pageSize) => {
  return axios.get(
    `https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${pageSize}`,
    { withCredentials: true }
  );
};

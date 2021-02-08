import * as axios from "axios";

const axiosInstanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "f91d3b30-b7d1-49f0-9fe1-21f35cccd421" },
});

export const usersAPI = {
  getUsers(pageNum, pageSize) {
    return axiosInstanse
      .get(`users?page=${pageNum}&count=${pageSize}`)
      .then((res) => res.data)
  },
  follow(userId) {
    return axiosInstanse
      .post(`follow/${userId}`);
  },
  unfollow(userId) {
    return axiosInstanse
      .delete(`follow/${userId}`);
  }
}

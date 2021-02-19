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
      .then((res) => res.data);
  },
  follow(userId) {
    return axiosInstanse.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return axiosInstanse.delete(`follow/${userId}`);
  },
  getProfile(userId) {
    console.warn('Obsolete method. Please use profileAPI object')
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return axiosInstanse.get(`profile/` + userId);
  },
  getStatus(userId) {
    return axiosInstanse.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return axiosInstanse.put(`profile/status`, { status: status });
  },
};

export const authAPI = {
  me() {
    return axiosInstanse.get(`auth/me`);
  }
}

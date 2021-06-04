import axios from "axios";

const axiosInstanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "f91d3b30-b7d1-49f0-9fe1-21f35cccd421" },
});

export const usersAPI = {
  getUsers(pageNum = 1, pageSize = 10) {
    return axiosInstanse
      .get(`users?page=${pageNum}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(userId: number) {
    return axiosInstanse.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return axiosInstanse.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return axiosInstanse.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return axiosInstanse.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return axiosInstanse.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return axiosInstanse.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

type MeResponceType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: number
  messages: Array<string>
};

export const authAPI = {
  me() {
    return axiosInstanse.get<MeResponceType>(`auth/me`).then((res) => res.data);
  },
  login(email: string, password: string, rememberMe = false) {
    return axiosInstanse.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return axiosInstanse.delete(`auth/login`);
  },
};

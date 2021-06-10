import { axiosInstanse, CommonResponceType, LoginResponceDataType, MeResponceDataType } from "./api";

export const authAPI = {
  me() {
    return axiosInstanse
      .get<CommonResponceType<MeResponceDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(email: string, password: string, rememberMe = false) {
    return axiosInstanse
      .post<CommonResponceType<LoginResponceDataType>>(`auth/login`, {
        email,
        password,
        rememberMe,
      })
      .then((res) => res.data);
  },
  logout() {
    return axiosInstanse.delete(`auth/login`);
  },
};
import { axiosInstanse, CommonResponceType, GetUserItemsType } from "./api";

export const usersAPI = {
  getUsers(pageNum = 1, pageSize = 10) {
    return axiosInstanse
      .get<GetUserItemsType>(`users?page=${pageNum}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(userId: number) {
    return axiosInstanse.post<CommonResponceType>(`follow/${userId}`).then(res => res.data)
  },
  unfollow(userId: number) {
    return axiosInstanse.delete(`follow/${userId}`).then(res => res.data) as Promise<CommonResponceType>
  },
};
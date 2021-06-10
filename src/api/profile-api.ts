import { PhotosType, ProfileType } from "../types/types";
import { axiosInstanse, CommonResponceType } from "./api";

type SavePhotoresponceDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return axiosInstanse.get<ProfileType>(`profile/` + userId).then(res => res.data)
  },
  getStatus(userId: number) {
    return axiosInstanse.get<string>(`profile/status/` + userId).then(res => res.data)
  },
  updateStatus(status: string) {
    return axiosInstanse
      .put<CommonResponceType>(`profile/status`, { status: status })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return axiosInstanse
      .put<CommonResponceType<SavePhotoresponceDataType>>(
        `profile/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data);
  },
};

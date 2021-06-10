import axios from "axios";
import { UserType } from "../types/types";

export const axiosInstanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "f91d3b30-b7d1-49f0-9fe1-21f35cccd421" },
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export type CommonResponceType<D = {}> = {
  data: D;
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};
export type MeResponceDataType = {
  id: number
  email: string
  login: string
};
export type LoginResponceDataType = {
  userId: number;
};

export type GetUserItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

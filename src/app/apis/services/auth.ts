import { IJoinInformation } from "@/types/join";
import { instance } from "../axios";
import { IUser } from "@/types/login";

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/login", user);
  return res;
};

export const userJoin = async ({ joinData, joinType }: { joinData: IJoinInformation; joinType: string }) => {
  const res = await instance.post(`/join/${joinType}`, joinData);
  return res.data;
};

export const joinAuthentication = async (email: string) => {
  const res = await instance.post("/email/authentication", { email: email });
  return res.data;
};

export const findEmail = async (user: IUser) => {
  const res = await instance.post("/email", user);
  return res.data;
};

export const passwordAuthentication = async (user: IUser) => {
  const res = await instance.post("/password", user);
  return res.data;
};

export const resetPassword = async (user: IUser) => {
  const res = await instance.patch("/password", user);
  return res.data;
};

export const pbProfile = async (id:number) => {
  try {
    const res = await instance.get(`/auth/profile/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const pbPortfolio = async (id: number) => {
  try {
    const res = await instance.get(`/auth/portfolio/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
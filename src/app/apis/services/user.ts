import { instance } from "../axios";

export const userBookMarkPB = async () => {
  try {
    const res = await instance.get("/user/bookmarks/pb");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userBookMarkContent = async () => {
  try {
    const res = await instance.get("/auth/bookmarks/boards");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

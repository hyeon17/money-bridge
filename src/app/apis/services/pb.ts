import { instance } from "../axios";

export const pbWriteContent = async (text:any) => {
  try {
    const res = await instance.post("/pb/board",text);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
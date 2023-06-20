import { instance } from "../axios";

export const LoungeBoard = async () => {
  try {
    const res = await instance.get("/lounge/board");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoungeHot = async () => {
  try {
    const res = await instance.get("/boards/hot");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoungeNew = async () => {
  try {
    const res = await instance.get("/boards");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ContentsId = async (id: any) => {
  try {
    const res = await instance.get(`/board/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


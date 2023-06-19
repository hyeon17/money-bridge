import { instance } from "../axios";
import { useQuery } from "@tanstack/react-query";

export const useLoungeBoard = () => {
  const queryKey = "/lounge/board";
  const queryFn = () =>
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};

export const useLoungeHot = () => {
  const queryKey = "/boards/hot";
  const queryFn = () =>
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};

export const useLoungeNew = () => {
  const queryKey = "/boards";
  const queryFn = () =>
    instance.get(queryKey).then(res => {
      return res.data;
    });

  return useQuery([queryKey], queryFn);
};
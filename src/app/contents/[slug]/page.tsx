"use client";
import React from "react";
import Poster from "@/components/contentsPage/Poster";
import Content from "@/components/contentsPage/Content";
import Comments from "@/components/contentsPage/Comments";
import BlurModal from "@/components/common/Modal/BlurModal";
import { getContentsId, getNotLoginContents } from "@/app/apis/services/common";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ILoginedUserInfo, IDataResponse } from "@/types/common";
import { AxiosError } from "axios";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { IContentsInfo } from "@/types/contents";
import { getCookie } from "@/utils/cookies";

function ContentsDetail() {
  const token = getCookie("Authorization");
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: contents } = useQuery<IDataResponse<IContentsInfo>, AxiosError>({
    queryKey: ["getContentsId", id],
    queryFn: () => (token ? getContentsId(id) : getNotLoginContents(id)),
    refetchOnWindowFocus: false,
  });

  const { data: userData } = useQuery<ILoginedUserInfo, AxiosError>({
    queryKey: ["getLoginedUserInfo"],
    queryFn: getLoginedUserInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {contents && (
        <>
          <div className="relative h-[390px]">
            <Poster img={contents.data.thumbnail} />
          </div>
          <Content contentData={contents.data} userData={userData} bookmarks={userData?.role === "PB" ? false : true} />
          <Comments commentData={contents.data} userData={userData} />
        </>
      )}
    </>
  );
}

export default ContentsDetail;

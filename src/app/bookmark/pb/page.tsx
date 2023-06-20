"use client";
import React from "react";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { userBookMarkPB } from "@/app/apis/services/user";
import { useQuery } from "@tanstack/react-query";

function PbBookMark() {
  const { data: res } = useQuery(["/user/bookmarks/pb"], userBookMarkPB);

  return (
    <div className="mb-10">
      <BookMark />
      {res?.list ? <PbCardList props={res} /> : <div className="flex justify-center">북마크 한 콘텐츠 없음</div>}
    </div>
  );
}

export default PbBookMark;

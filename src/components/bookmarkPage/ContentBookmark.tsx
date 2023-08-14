"use client";
import React from "react";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import BookMark from "@/components/bookmarkPage/BookMark";
import { getBookMarkContent } from "@/app/apis/services/user";
import { useQuery } from "@tanstack/react-query";
import { IContentCard } from "@/types/card";
import { IListResponse } from "@/types/common";

function ContentBookMark() {
  const { data: res } = useQuery<IListResponse<IContentCard>>({
    queryKey: ["getBookMarkContent"],
    queryFn: () => getBookMarkContent(0),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="mb-10">
      <BookMark />
      {res && res?.list.length > 0 ? (
        <ContentCardList queryKey={"/auth/bookmarks/boards"} api={getBookMarkContent} bookmarks={true} />
      ) : (
        <div className="flex justify-center">북마크 한 콘텐츠 없음</div>
      )}
    </div>
  );
}

export default ContentBookMark;

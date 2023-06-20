"use client";
import React from "react";
import TopNav from "@/components/common/TopNav";
import { LoungeNew as New} from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { useQuery } from "@tanstack/react-query";

function LoungeNew() {
  const { data: res, error, isLoading, isSuccess } = useQuery(["/boards"], New);

  return (
    <>
      <TopNav title="최신 콘텐츠" hasBack={true} />
      <ContentCardList props={res} />
    </>
  );
}

export default LoungeNew;

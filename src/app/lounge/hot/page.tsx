"use client"
import React from "react";
import TopNav from "@/components/common/TopNav";
import { LoungeHot as Hot } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import { useQuery } from "@tanstack/react-query";

function LoungeHot() {
  const { data: res } = useQuery(["/boards/hot"], Hot);

  return (
    <>
      <TopNav title="인기 콘텐츠" hasBack={true} />
      <ContentCardList props={res} />
    </>
  );
}

export default LoungeHot;

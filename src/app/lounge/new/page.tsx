"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/common/TopNav";
import { useLoungeNew } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeNew() {
  const [data, setData] = useState();
  const { data: res, error, isLoading, isSuccess } = useLoungeNew();

  useEffect(() => {
    if (isSuccess) {
      setData(res);
    }
  }, [isSuccess, res]);

  return (
    <>
      <TopNav title="최신 콘텐츠" hasBack={true} />
      <ContentCardList props={data} />
    </>
  );
}

export default LoungeNew;

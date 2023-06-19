"use client"
import React, { useEffect, useState } from "react";
import TopNav from "@/components/common/TopNav";
import { useLoungeHot } from "@/app/apis/services/common";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";

function LoungeHot() {
  const [data, setData] = useState();
  const { data: res, error, isLoading, isSuccess } = useLoungeHot();

  useEffect(() => {
    if (isSuccess) {
      setData(res);
    }
  }, [isSuccess, res]);

  return (
    <>
      <TopNav title="인기 콘텐츠" hasBack={true} />
      <ContentCardList props={data} />
    </>
  );
}

export default LoungeHot;

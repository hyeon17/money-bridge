"use client";
import React, { useState, useEffect, useRef } from "react";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";
import { IPbCard } from "@/types/card";

function PbCardList({ props }: { props: any; }) {
  const dataList = props?.data ? props.data.list : props;
  const data = props?.data ? props.data : props;
  const [isLastPage, setIsLastPage] = useState<boolean>(data?.last);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const handleObserver: IntersectionObserverCallback = entries => {
    const target = entries[0];
    if (target.isIntersecting && !isLastPage) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    const startIndex = dataList?.length;
    const endIndex = startIndex + 10;
    // const newItems = dataList?.slice(startIndex, endIndex);
    // 다음 페이지를 부르게 하기
    // setItems((prevItems: any) => [...prevItems, ...newItems]);

    // 현재 페이지가 마지막 페이지인지 확인
    if (data?.curPage === data?.totalPages) {
      setIsLastPage(true);
    }
  };

  return (
    <>
      <ul>
        {dataList?.map((item: IPbCard) => (
          <PbCardItem key={item.id} item={item} />
        ))}
      </ul>
      {!isLastPage && <div ref={observerRef} style={{ height: "1px" }}></div>}
    </>
  );
}

export default PbCardList;

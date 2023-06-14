"use client";
import React, { useState, useEffect, useRef } from "react";
import PbReviewItem from "@/components/pbdetailPage/pbreviewPage/PbReviewItem";

function PbReviewList({ props }: any) {
  const dataList = props.data ? props.data.list : props;
  const data = props.data ? props.data : props;
  const [items, setItems] = useState(dataList.slice(0, 10));
  const [isLastPage, setIsLastPage] = useState(false);
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
    // todo: api완성되면 api의 last를 사용하기
    if (target.isIntersecting && !isLastPage) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    const startIndex = items.length;
    const endIndex = startIndex + 10;
    const newItems = dataList.slice(startIndex, endIndex);
    setItems((prevItems: any) => [...prevItems, ...newItems]);

    // 현재 페이지가 마지막 페이지인지 확인
    if (data.curPage === data.totalPages - 1) {
      setIsLastPage(true);
    }
  };
  return (
    <>
      <ul>
        {items.map((item: any) => (
          <PbReviewItem key={item.reviewId} item={item} />
        ))}
      </ul>
      {!isLastPage && <div ref={observerRef} style={{ height: "1px" }}></div>}
    </>
  );
}

export default PbReviewList;
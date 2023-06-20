"use client";
import React, { useState, useEffect, useRef } from "react";
import ContentCardItem from "@/components/common/Card/CardItem/ContentCardItem";
import { IContentCard } from "@/types/card";

function ContentCardList({ props }: { props: any; }) {
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
    <ul>
      {props ? (
        dataList?.map((item: IContentCard) => <ContentCardItem key={item.id} item={item} />)
      ) : (
        <li className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
          작성한 콘텐츠가 없습니다
        </li>
      )}
      {!isLastPage && <div ref={observerRef} style={{ height: "1px" }}></div>}
    </ul>
  );
}

export default ContentCardList;

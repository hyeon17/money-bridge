"use client";
import React, { useState } from "react";
import TopNav from "@/components/common/TopNav";
import search_active from "/public/assets/images/icon/search_active.svg";
import Image from "next/image";

function LoungeSearch() {
  const [isActive, setIsActive] = useState(false);

  const handlePBSearchClick = () => {
    setIsActive(true);
  };

  const handleContentSearchClick = () => {
    setIsActive(false);
  };
  return (
    <>
      <TopNav title="검색하기" hasBack={true} />
      <div className="relative">
        <input className="search_input mt-6 h-[56px] w-full" type="text" placeholder="궁금한 정보를 검색해보세요" />
        <Image src={search_active} alt="검색 활성화" className="absolute left-4 top-10 h-[25px] w-[25px]" />
      </div>
      <div className="mt-6 flex text-base font-bold text-primary-normal">
        <div
          className={`mr-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
            isActive ? "bg-primary-normal text-white" : ""
          }`}
          onClick={handlePBSearchClick}
        >
          PB 검색
        </div>
        <div
          className={`ml-2 flex h-[40px] flex-1 cursor-pointer items-center justify-center rounded-3xl border-[2px] ${
            isActive ? "" : "bg-primary-normal text-white"
          }`}
          onClick={handleContentSearchClick}
        >
          콘텐츠 검색
        </div>
      </div>
      <div>
        <div>PB 검색 결과</div>
        <div>콘텐츠 검색 결과</div>
        <div>일치하는 정보가 없습니다</div>
        <div>카드</div>
      </div>
    </>
  );
}

export default LoungeSearch;

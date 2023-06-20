"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbcontent_bookmark_filled.svg";
import { useUserStore } from "@/store/userStore";

function ContentCardItem({ item }: { item: any }) {
  const router = useRouter();
  const userData = useUserStore();
  const [isBookmark, setIsBookmark] = useState(item.isBookmark);
  const bookMark = (event: any) => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가,삭제 api호출
    event.stopPropagation();
  };
  const goTOContent = () => {
    router.push(`/contents/${item.id}`);
  };

  return (
    <li className="card h-56 cursor-pointer bg-white" onClick={goTOContent}>
      <div className="px-[17px]">
        <div className="mt-7 flex">
          <div className="flex-1">
            <div className="mb-1 text-xs">
              {item.tag1}&nbsp;&nbsp;•&nbsp;&nbsp;{item.tag2}
            </div>
            <div className="text-2xl font-bold">{item.title}</div>
          </div>
          {userData.user.role && (
            <button onClick={bookMark} className="flex-3 flex w-12 items-center justify-center">
              {item.isBookmark ? (
                <Image src={bookmark_filled} alt="북마크 해제" width={0} height={0} />
              ) : (
                <Image src={bookmark} alt="북마크" width={0} height={0} />
              )}
            </button>
          )}
        </div>
        <div className="mt-20 flex">
          <div className="flex h-[31px] flex-col text-xs">
            <div className="flex">
              <p className="font-bold">{item.pbName}PB</p>&nbsp;| {item.career}년차
            </div>
            <div>{item.msg}</div>
          </div>
          {/* <Image src={item.companyLogo} alt="증권사로고" className="w-[114px] h-[26px] ml-[45px]" width={0} height={0} /> */}
        </div>
      </div>
    </li>
  );
}

export default ContentCardItem;

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PbCardProps {
  props: any[];
}

function PbCard({ props }: PbCardProps) {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(false);

  const bookMark = () => {
    setIsBookmark(!isBookmark);
    // 북마크 여부에 따라 추가, 삭제 api호출
  };

  return (
    <>
      {props.map((item: any) => (
        <div id={item._id} key={item._id}>
          <div>
            <div>
              <Image src={item.profile} alt="프로필" width={100} height={100} />
              프로필
            </div>
            <div>
              <div>{item.name} 이름</div>
              <div>{item.companyName} 소속</div>
              <div>
                {item.career}
                {item.speciality1}
                {item.speciality2}
                전문분야/경력
              </div>
            </div>
            <button onClick={bookMark}>{isBookmark ? "북마크 해제" : "북마크"}</button>
          </div>
          <div>{item.intro} 한줄 소개</div>
          <div>
            <div>
              <div>{item.reservCount} 상담횟수</div>
              <div>{item.reviewCount} 후기</div>
            </div>
            <button onClick={() => router.push(`/detailPage/${item._id}`)}>정보보기</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default PbCard;

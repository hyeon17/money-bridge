"use client";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import Link from "next/link";

function PbRecommend() {
  const { userInfo } = useGetUserInfo();

  return userInfo?.name ? (
    <div className="card my-8 h-[214px] bg-primary-normal font-bold">
      <div className="p-6">
        <h4 className="mb-1 text-xs text-white">맞춤 PB 추천</h4>
        <p className="text-xl text-white">
          {userInfo?.name}님께 딱 맞는
          <br />
          PB 매칭 결과가 도착했어요!
        </p>
        <div className="flex justify-end w-full">
          <Link
            href="/pblist/recommend"
            className="mt-10 flex h-11 w-[168px] items-center justify-center rounded-sm bg-white text-xs text-primary-normal"
          >
            PB 매칭 결과 확인하기
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PbRecommend;

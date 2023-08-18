"use client";

import PBInfo from "@/components/myPage/PBInfo";
import UserInfo from "@/components/myPage/UserInfo";
import Link from "next/link";
import Image from "next/image";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useLogout } from "@/hooks/useLogout";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "@/utils/cookies";

const LINK_STYLE = "flex items-center text-sm justify-between py-2 mb-2 pr-1";
const BUTTON_STYLE = "gray-heavy text-xs underline decoration-gray-heavy decoration-1";
const nextIcon = "/assets/images/nextIcon.svg";

export const revalidate = 0;

function MyPage() {
  const { userInfo, userLoading, isLoginError } = useGetUserInfo();
  const logout = useLogout();
  const authorization = getCookie("Authorization");

  useEffect(() => {
    if (!authorization || isLoginError) redirect("/login");
  }, []);

  if (userLoading || !userInfo) return null;

  return (
    <>
      {userInfo.role === "USER" && <UserInfo />}
      {userInfo.role === "PB" && <PBInfo />}
      <section className="mb-10">
        <h3 className="mb-2 text-xl font-bold">나의 관리</h3>
        <ul>
          <li>
            <Link href="/my/editInfo" className={LINK_STYLE}>
              <span>개인 정보 수정</span>
              <Image src={nextIcon} width={14} height={14} alt="개인 정보 설정 이동" />
            </Link>
          </li>
          {userInfo.role === "USER" && (
            <li>
              <Link href="/my/propensity" className={LINK_STYLE}>
                <span>나의 투자 성향</span>
                <Image src={nextIcon} width={14} height={14} alt="나의 투자 성향 이동" />
              </Link>
            </li>
          )}
        </ul>
      </section>
      <section className="mb-20">
        <h3 className="mb-2 text-xl font-bold">고객센터</h3>
        <ul>
          <li>
            <Link href="/faq" className={LINK_STYLE}>
              <span>자주 묻는 질문</span>
              <Image src={nextIcon} width={14} height={14} alt="자주 묻는 질문 이동" />
            </Link>
          </li>
          <li>
            <Link href="/notice" className={LINK_STYLE}>
              <span>공지사항</span>
              <Image src={nextIcon} width={14} height={14} alt="공지사항 이동" />
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex flex-col items-start gap-6">
        <Link href="/terms" className={BUTTON_STYLE}>
          서비스 약관
        </Link>
        <Link href="/withdraw" className={BUTTON_STYLE}>
          탈퇴하기
        </Link>
        <button onClick={() => logout()} className={BUTTON_STYLE}>
          로그아웃
        </button>
      </section>
    </>
  );
}

export default MyPage;

"use client";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/common/TopNav";
import Content from "@/components/pbdetailPage/Content";
import Intro from "@/components/pbdetailPage/Intro";
// import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";
// import profile from "@/mocks/hyeon17/PbDetail/Profile/profile.json";
import { useUserStore } from "@/store/userStore";
import About from "@/components/pbdetailPage/About";
import { pbProfile, pbPortfolio } from "@/app/apis/services/auth";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

function PbDetailInfo() {

  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());
  const { data: Profile } = useQuery([`/auth/profile/${id}`], () => pbProfile(id));
  // const { data: Portfolio } = useQuery([`/auth/portfolio/${id}`], () => pbPortfolio(id));

  // const data = authProfile.data;
  const profileData = Profile;
  const notLoginData = {
    companyLogo: profileData?.companyLogo,
    profile: profileData?.profile,
    msg: profileData?.msg,
  };
  const introData = {
    id: profileData?.id,
    profile: profileData?.profile,
    name: profileData?.name,
    isBookmarked: profileData?.isBookmarked,
    branchName: profileData?.branchName,
    msg: profileData?.msg,
    companyId: profileData?.companyId,
    companyName: profileData?.companyName,
    companyLogo: profileData?.companyLogo,
    reserveCount: profileData?.reserveCount,
    reviewCount: profileData?.reviewCount,
  };

  const contentData = {
    intro: profileData?.intro,
    name: profileData?.name,
    speciality1: profileData?.speciality1,
    speciality2: profileData?.speciality2,
    career: profileData?.career,
    award: profileData?.award,
  };

  const aboutData = {
    name: profileData?.name,
    id: profileData?.id,
    branchAddress: profileData?.branchAddress,
    branchName: profileData?.branchName,
    companyName: profileData?.companyName,
    branchLatitude: profileData?.branchLatitude,
    branchLongitude: profileData?.branchLongitude,
  };
  const userData = useUserStore();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userData.user.role);
  }, [userData]);

  return (
    <div className="mb-24 flex w-full flex-col">
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={!role ? notLoginData : introData} role={role} />
      {role && (
        <>
          <Content contentData={contentData} />
          <About aboutData={aboutData} role={role} />
        </>
      )}
    </div>
  );
}

export default PbDetailInfo;

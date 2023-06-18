"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/pbdetailPage/Intro";
import ContentCardList from "@/components/common/Card/CardList/ContentCardList";
import ContentData from "@/mocks/hyeon17/PbDetail/boards.json";
import TopNav from "@/components/common/TopNav";
import authProfile from "@/mocks/hyeon17/PbDetail/Profile/authProfile.json";
import { useRoleStore } from "@/store/roleStore";
import FixedButton from "@/components/pbdetailPage/FixedButton";

function PbDetailContent() {
  const data = authProfile.data;
  const introData = {
    id: data.id,
    profile: data.profile,
    name: data.name,
    isBookmarked: data.isBookmarked,
    branchName: data.branchName,
    msg: data.msg,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    reserveCount: data.reserveCount,
    reviewCount: data.reviewCount,
  };

  const userData = useRoleStore();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userData.user.role);
  }, [userData]);

  return (
    <div className="mb-32">
      <TopNav title="PB 상세프로필" hasBack={true} />
      <Intro introData={introData} role={role} />
      <ContentCardList props={ContentData} />
      <FixedButton role={role} />
    </div>
  );
}

export default PbDetailContent;

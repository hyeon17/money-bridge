"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";
import { useUserStore } from "@/store/userStore";
import TopNav from "@/components/common/TopNav";
import { LoungeBoard, LoungeNew } from "@/app/apis/services/common";
import { useQuery } from "@tanstack/react-query";
import { IListResponse } from "@/types/common";
import { IContentCard } from "@/types/card";

function Lounge() {
  const userData = useUserStore();
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [All, setAll] = useState<IListResponse<IContentCard> | undefined>();
  const [NewAndHot, setNewAndHot] = useState<IListResponse<IContentCard> | undefined>();
  const { data: newandhot } = useQuery(["/lounge/board"], LoungeBoard);
  const { data: all } = useQuery(["/boards"], LoungeNew);

  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
    setNewAndHot(newandhot);
    setAll(all);
  }, [userData, newandhot, all]);

  return (
    <>
      <TopNav title="라운지" hasBack={true} />
      <Intro role={role} />
      {role === "USER" && <PbRecommend name={name} />}
      <Content NewAndHot={NewAndHot} All={All} />
    </>
  );
}

export default Lounge;

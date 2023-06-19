"use client";
import React, { useEffect, useState } from "react";
import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import All from "@/mocks/hyeon17/Lounge/all.json";
import Content from "@/components/loungePage/Content";
import { useRoleStore } from "@/store/roleStore";
import TopNav from "@/components/common/TopNav";
import { useLoungeBoard, useLoungeNew } from "@/app/apis/services/common";
import { ListResponse } from "@/types/common";
import { ContentCard } from "@/types/card";

function Lounge() {
  const userData = useRoleStore();
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [All, setAll] = useState<ListResponse<ContentCard> | undefined>();
  const [NewAndHot, setNewAndHot] = useState<ListResponse<ContentCard> | undefined>();
  const { data: newandhot, error, isLoading, isSuccess } = useLoungeBoard();
  const { data: all } = useLoungeNew();

  useEffect(() => {
    setRole(userData.user.role);
    setName(userData.user.name);
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      setNewAndHot(newandhot);
      setAll(all);
    }
  }, [isSuccess, newandhot, all]);

  return (
    <div className="my-5 flex w-full flex-col">
      <TopNav title="라운지" hasBack={true} />
      <Intro role={role} />
      {role === "USER" && <PbRecommend name={name} />}
      <Content NewAndHot={NewAndHot} All={All} />
    </div>
  );
}

export default Lounge;

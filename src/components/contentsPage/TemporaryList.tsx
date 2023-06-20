"use client";
import React, { useState, useEffect, useRef } from "react";
import TemporaryItem from "@/components/contentsPage/TemporaryItem";

function TemporaryList({ props }: { props: any }) {;

  return (
    <ul>
      {props ? (
        props?.map((item: any) => <TemporaryItem key={item.id} item={item} />)
      ) : (
        <li className="mx-auto my-4 flex h-48 w-4/5 items-center justify-center rounded-xl shadow-md">
          작성한 콘텐츠가 없습니다
        </li>
      )}
    </ul>
  );
}

export default TemporaryList;

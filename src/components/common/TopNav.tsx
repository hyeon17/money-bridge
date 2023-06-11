"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TopNav({
  title,
  hasBack,
  hasClose,
  path = "",
}: {
  title: string;
  hasBack?: boolean;
  hasClose?: boolean;
  path?: string;
}) {
  const router = useRouter();

  return (
    <div className="fixed top-0 grid h-[40px] min-w-[425px] grid-cols-3 items-center px-[10px]">
      <button className="text-left" onClick={() => router.back()}>
        {hasBack && "<"}
      </button>
      <span className="text-center font-bold leading-[22px]">{title}</span>
      <button className="text-right" onClick={() => router.replace(path)}>
        {hasClose && "X"}
      </button>
    </div>
  );
}

export default TopNav;

import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PB 리스트",
};

function PBListLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default PBListLayout;

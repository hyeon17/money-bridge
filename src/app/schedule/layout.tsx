import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "일정 관리",
};

function SchduleLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default SchduleLayout;

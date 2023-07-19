"use client";

import Link from "next/link";
import home from "/public/assets/images/navbar/home.svg";
import contacts from "/public/assets/images/navbar/contacts.svg";
import list from "/public/assets/images/navbar/list.svg";
import identity from "/public/assets/images/navbar/identity.svg";
import Image from "next/image";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { usePathname } from "next/navigation";

const navItems = [
  {
    role: "ALL",
    href: "/",
    image: home,
    text: "홈",
  },
  {
    role: "ALL",
    href: "/lounge",
    image: list,
    text: "라운지",
  },
  {
    role: "USER",
    href: "/pblist",
    image: contacts,
    text: "PB 리스트",
  },
  {
    role: "PB",
    href: "/management?process=APPLY",
    image: contacts,
    text: "고객관리",
  },
  {
    role: "ALL",
    href: "/my",
    image: identity,
    text: "마이페이지",
  },
];

function Navbar() {
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-[70px] w-full max-w-[768px] -translate-x-1/2 justify-around bg-white p-2">
      {navItems.map(item => {
        if (item.role === "ALL" || item.role === userInfo?.role) {
          return (
            <Link key={item.text} href={item.href} className="group flex w-[74px] flex-col items-center">
              <Image src={item.image} alt={item.text} width={26} height={26} />
              <span className={`text-sm group-focus:font-bold ${path === item.href && "font-bold"}`}>{item.text}</span>
            </Link>
          );
        }
      })}
    </nav>
  );
}

export default Navbar;

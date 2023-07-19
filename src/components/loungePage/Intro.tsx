import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonROLE } from "@/constants/enum";
import ButtonModal from "@/components/common/ButtonModal";
import Link from "next/link";
import bookmark from "/public/assets/images/icon/lounge_bookmark.svg";
import search from "/public/assets/images/icon/lounge_search.svg";
import Image from "next/image";
import mylist from "/public/assets/images/icon/lounge_mylist.svg";
import write from "/public/assets/images/icon/lounge_write.svg";
import { ILoginedUserInfo } from "@/types/common";

function Intro({ userData }: { userData: ILoginedUserInfo | undefined }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modalContents = {
    content: "로그인 후 북마크 저장이 가능합니다",
    confirmText: "확인",
    confirmFn: () => {
      router.push("/login");
    },
  };

  const goToBookMark = () => {
    if (userData?.role) {
      router.push("/bookmark/content");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="mx-[-16px] flex h-[190px] items-center bg-secondary-heavy px-[16px]">
      <div className="flex w-full flex-col">
        <h3 className="mb-1 ml-2 text-3xl font-bold text-white">Lounge</h3>
        <p className="ml-2 text-xs text-white">
          프라이빗 뱅커들의
          <br />
          고급정보를 만나보세요
        </p>
        {userData?.role === CommonROLE.PB ? (
          <div className="flex justify-end">
            <Link
              href={`/detail/content/${userData?.id}`}
              className="mr-4 flex h-16 w-16 flex-col items-center justify-center rounded-md bg-secondary-light text-xs font-bold text-secondary-heavy"
            >
              <Image src={mylist} alt="내 글 목록" />내 글 목록
            </Link>
            <Link
              href="/contents/write"
              className="mr-4 flex h-16 w-16 flex-col items-center justify-center rounded-md bg-secondary-light text-xs font-bold text-secondary-heavy"
            >
              <Image src={write} alt="작성하기" />
              작성하기
            </Link>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              className="mr-4 flex h-16 w-16 flex-col items-center justify-center rounded-md bg-secondary-light text-xs font-bold text-secondary-heavy"
              onClick={goToBookMark}
            >
              <Image src={bookmark} alt="내 북마크" />내 북마크
            </button>
            <Link
              className="mr-4 flex h-16 w-16 flex-col items-center justify-center rounded-md bg-secondary-light text-xs font-bold text-secondary-heavy"
              href="/lounge/search"
            >
              <Image src={search} alt="검색" />
              검색
            </Link>
          </div>
        )}
      </div>
      {isOpen && <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Intro;

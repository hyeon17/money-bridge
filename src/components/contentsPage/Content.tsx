import Image from "next/image";
import Link from "next/link";
import React from "react";
import bookmark from "/public/assets/images/icon/pbcontent_bookmark.svg";
import bookmark_filled from "/public/assets/images/icon/pbco ntent_bookmark_filled.svg";
import share from "/public/assets/images/icon/share.svg";
import useBookMark from "@/hooks/useBookMark";
import useShare from "@/hooks/useShare";
import { usePathname } from "next/navigation";
import ButtonModal from "@/components/common/ButtonModal";
import Download from "@/components/pbdetailPage/Download";
import dayjs from "dayjs";
import user_profile from "/public/assets/images/profile.svg";
import "@/styles/content.css";

function Content({ contentData }: { contentData: any }) {
  const { thumbnail, title, content, createdAt, tag1, tag2, pdId, name, isBookmarked ,profile} = contentData;
  const pathname = usePathname();
  const base = "http://localhost:3000";
  const urlToCopy = base + pathname;

  const { isBookmark, isBookmarkOpen, setIsBookmarkOpen, bookMarkHandler, bookMarkContents } = useBookMark(
    isBookmarked,
    "/bookmark/content",
  );

  const {
    isShare,
    isShareOpen,
    setIsShareOpen,
    shareHandler,
    shareContents,
    isCopy,
    isCopyOpen,
    setIsCopyOpen,
    copyContents,
  } = useShare(urlToCopy, title, content, thumbnail);

  return (
    <div>
      <div className="card mt-[33px] flex h-[52px] flex-row items-center rounded-md bg-white font-bold">
        <Image
          src={profile? profile : user_profile}
          alt="프로필"
          width={36}
          height={36}
          className="mr-[12px] h-[36px] w-[36px] rounded-full"
        />
        <div className="flex-1 text-[17px]">{name} PB</div>
        <Link
          href={`/detail/info/${pdId}`}
          className="flex-3 flex h-full w-[112px] items-center justify-center rounded-r-md bg-secondary-heavy text-base text-white"
        >
          프로필 보기
        </Link>
      </div>
      <div className="mt-[24px]">
        <div className="text-xs font-bold">
          {tag1}・{tag2}
        </div>
        <div className="mb-[11px] text-2xl font-bold">{title}</div>
        <div className="mb-[15px] flex">
          <div className="font-xs flex-1">{dayjs(createdAt).format("YYYY. MM. DD")}</div>
          <div className="flex">
            <button onClick={shareHandler} className="flex w-9 justify-end">
              <Image src={share} alt="공유하기" width={24} height={24} className="icon" />
            </button>
            <button onClick={bookMarkHandler} className="flex w-9 justify-end">
              {isBookmark ? (
                <Image src={bookmark_filled} alt="북마크 활성화" width={24} height={24} className="icon" />
              ) : (
                <Image src={bookmark} alt="북마크" width={24} height={24} className="icon" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-[103px] text-sm p-4">{content}</div>
      </div>
      <Download
        file={thumbnail}
        title="첨부파일 다운로드"
        style="ml-1 h-12 w-[100px] rounded-md bg-secondary-heavy text-white"
      />
      {isShareOpen && isShare && (
        <ButtonModal modalContents={shareContents} isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
      )}
      {isCopyOpen && isCopy && (
        <ButtonModal modalContents={copyContents} isOpen={isCopyOpen} setIsOpen={setIsCopyOpen} />
      )}
      {isBookmarkOpen && isBookmark && (
        <ButtonModal modalContents={bookMarkContents} isOpen={isBookmarkOpen} setIsOpen={setIsBookmarkOpen} />
      )}
    </div>
  );
}

export default Content;

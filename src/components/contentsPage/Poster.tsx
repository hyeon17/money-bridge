import Image from "next/image";
import React from "react";

function Poster({img} :{img:any}) {
  return <Image src={img} alt="poster" width={0} height={390} className="h-[390px] w-auto mx-auto" priority={true} />;
}

export default Poster;

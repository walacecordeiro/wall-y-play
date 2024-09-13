"use client";

import CloseMenu from "@/app/functions/closeMenu";
import baseLogo from "@/assets/baseLogo.svg";
import moldeLogo from "@/assets/moldeLogo.svg";

import { amatic_SC } from "@/fonts";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
 return (
  <Link onClick={CloseMenu} className="relative flex items-center gap-1" href="/app">
   <Image src={baseLogo} alt="logo do site" width={undefined} height={35} />
   <Image
    src={moldeLogo}
    alt="logo do site"
    width={undefined}
    height={35}
    className="absolute top-0 animate-spin-slow"
   />
   <span className={`${amatic_SC.className} text-2xl`}>Wall-y Play</span>
  </Link>
 );
}

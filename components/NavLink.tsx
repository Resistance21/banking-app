"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  route: string;
  imgURL: string;
  label: string;
  mobileNav?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const NavLink = ({ imgURL, label, route, mobileNav }: NavLinkProps) => {
  const pathName = usePathname();

  const isActive = pathName === route || pathName.startsWith(`${route}/`);
  return (
    <Link
      key={mobileNav ? `mobile-${label}` : label}
      href={route}
      className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
    >
      <div className=" relative size-6">
        <Image
          src={imgURL}
          alt={label}
          fill
          className={cn({ "brightness-[3] invert-0": isActive })}
        />
      </div>
      <p
        className={cn("", {
          "!text-white": isActive,
          "sidebar-label": !mobileNav,
          "mobilenav-sheet_close": mobileNav,
        })}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavLink;

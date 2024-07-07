import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./NavLink";

const Sidebar = ({ user }: SiderbarProps) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          key={"nav-home"}
          href="/"
          className="mb-12 cursor-pointer items-center gap-2 flex"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Cursion</h1>
        </Link>
        {sidebarLinks.map((link, i) => {
          return <NavLink key={link.route} {...link} />;
        })}
      </nav>
    </section>
  );
};

export default Sidebar;

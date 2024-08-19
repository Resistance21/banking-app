"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import NavLink from "./NavLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";

const MobileNavBar = ({ user }: MobileNavProps) => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            height={30}
            width={30}
            alt="menu"
            className="cursour-pointer"
          />
        </SheetTrigger>
        <SheetClose>
          <SheetContent side="left" className="border-none bg-white">
            <SheetTitle className="hidden"></SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
            <Link
              key={"nav-home"}
              href="/"
              className="cursor-pointer items-center gap-2 px-4 flex"
            >
              <Image src="/icons/logo.svg" width={34} height={34} alt="Logo" />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Cursion
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathName === link.route;
                  //console.log(`${link.route} is ${isActive}`);
                  return (
                    <SheetClose asChild key={`close-menu-${link.label}`}>
                      <Link
                        key={`mobile-${link.label}`}
                        href={link.route}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <div className=" relative size-6">
                          <Image
                            src={link.imgURL}
                            alt={link.label}
                            fill
                            className={cn({
                              "brightness-[3] invert-0": isActive,
                            })}
                          />
                        </div>
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "!text-white": isActive,
                          })}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <Footer user={user} type="mobile" />
            </div>
          </SheetContent>
        </SheetClose>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;

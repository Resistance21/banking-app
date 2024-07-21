import MobileNavBar from "@/components/MobileNavBar";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import { useState, useContext } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  console.log(user);

  if (user.$id === "no user") redirect("sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" height={30} width={30} alt="menu icon" />
          <div>
            <MobileNavBar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { LogOut } from "@/lib/actions/user.actions";

type LogOutButtonProps = {
  cssProps: string;
};

const LogOutButton = ({ cssProps }: LogOutButtonProps) => {
  const logOut = async () => {
    await LogOut();
  };
  return (
    <div className={cssProps} onClick={logOut}>
      <Image src="icons/logout.svg" alt="Logout" fill />
    </div>
  );
};

export default LogOutButton;

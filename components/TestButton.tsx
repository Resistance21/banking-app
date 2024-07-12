"use client";
import { LogOut } from "@/lib/actions/user.actions";
import React from "react";

const TestButton = () => {
  const logOutUser = async () => {
    const res = await LogOut();
    console.log(res);
  };

  return <button onClick={logOutUser}>sign out</button>;
};

export default TestButton;

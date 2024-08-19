import { LogOut } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";
import LogOutButton from "./LogOutButton";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const logOut = async () => {
    await LogOut();
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user.name}
        </h1>
        <p className="tesxt-14 truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>
      <LogOutButton cssProps="footer_image cursor-pointer" />
    </footer>
  );
};

export default Footer;

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await createLinkToken(user);
        setToken(data!);
      } catch (error) {
        console.error("Token error:", error);
      }
    };
    getToken();
  }, [user]);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, exit, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button variant="ghost" onClick={() => open()} className="plaid-ghost">
          <Image
            src="icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className=" hidden text-[16px] font-semibold text-black-2 xl:block">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button className="plaidlink-default" onClick={() => open()}>
          <Image
            src="icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className=" text-[16px] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;

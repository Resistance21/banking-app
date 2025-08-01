"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /*   useEffect(() => {
    let loggedIn: User;
    const userGet = async () => {
      loggedIn = await getLoggedInUser();
      console.log("USER", loggedIn, typeof loggedIn);
      setUser(loggedIn);
    };
    userGet();
    console.log(user);
  }, []); */
  //if (user) router.push("/");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
          city: data.city!,
        };
        const signedInUser = await signUp(userData);
        setUser(signedInUser);
      }
      if (type === "sign-in") {
        const signedInUser = await signIn({
          email: data.email,
          password: data.password,
        });

        if (signedInUser) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const guestLogin = async () => {
    try {
      setIsLoading(true);
      if (type === "sign-in" || type === "sign-up") {
        const signedInUser = await signIn({
          email: "john2.j@email.com",
          password: "qwedsazxc",
        });

        if (signedInUser) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Cursion
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-grey-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user!} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeHolder="Enter your First name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="last Name"
                      placeHolder="Enter your Last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeHolder="Enter your Address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeHolder="Enter your City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeHolder="ex: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Post Code"
                      placeHolder="ex: 1432"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeHolder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeHolder="ex: 1234"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeHolder="Enter your email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeHolder="Enter your password"
                  />
                </>
              )}
              {type === "sign-in" && (
                <>
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeHolder="Enter your Email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeHolder="Enter your Password"
                  />
                </>
              )}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? `Don't have an account?`
                : `Already have an account?`}
            </p>
            <Link
              href={type === "sign-in" ? `/sign-up` : `sign-in`}
              className="form-link"
            >
              {type === "sign-in" ? `Sign Up` : `Sign In`}
            </Link>
          </footer>
          <div className="flex flex-col gap-4">
            <Button
              onClick={guestLogin}
              className="form-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                </>
              ) : (
                "Sign In With Guest"
              )}
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default AuthForm;

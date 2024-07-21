"use client";

import { getLoggedInUser } from "@/lib/actions/user.actions";
import React, { createContext, ReactNode, useContext, useState } from "react";

type UserContextProps = {
  user: User;
  getSignedInUser: () => void;
};

const defaultUser: User = {
  $id: "no user",
  email: "",
  userId: "",
  dwollaCustomerUrl: "",
  dwollaCustomerId: "",
  firstName: "",
  lastName: "",
  name: "",
  address1: "",
  city: "",
  state: "",
  postalCode: "",
  dateOfBirth: "",
  ssn: "",
};

const UserContext = createContext<UserContextProps>({
  user: defaultUser,
  getSignedInUser: () => {},
});

export const UserProvider = async ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const getSignedInUser = async () => {
    const loggedUser: User = await getLoggedInUser();

    setUser(loggedUser);
  };

  return (
    <UserContext.Provider value={{ user, getSignedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a ContextProvider");
  }
  return context;
};
//export { UserProvider, useUserContext };

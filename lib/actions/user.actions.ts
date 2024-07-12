'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appwite"
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { stringify } from "querystring";

export const CheckForUser = async() => {
  const { account } = await createSessionClient();
  return account.get();
}

export const signIn = async (userData: signInProps) => {
  try {

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(userData.email, userData.password)

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const logedInUser = await getLoggedInUser()
   
    return stringify(logedInUser) 
    
  } catch(error){
    console.error('sign in error:' + error)
  }
}

export const signUp = async (userData:SignUpParams) => {
  try {
    const {address1,city,dateOfBirth,email,firstName,lastName,password,postCode,ssn,state} =userData
      const { account } = await createAdminClient();

  const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
    return parseStringify(newUserAccount);
  } catch(error){
    console.error('sign up error:' + error)
  }
}

export const LogOut = async () => {
  try {
    console.log(`LOGGING OUT`)
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session');
    await account.deleteSession('current')
  } catch (error) {
    console.log('logout error', error)
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    console.log('GETTING USER')
    const { account } = await createSessionClient();
    const loggedUser = await account.get();
    return parseStringify(loggedUser);
  } catch (error) {
    console.error(error)
    return null;
  }
}

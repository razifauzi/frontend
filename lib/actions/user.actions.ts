'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "./appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"


export const signIn = async ({email,password}:signInProps) => {
    try{
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email,password)
        return parseStringify(response)
    }catch (error){
        console.log('Error',error)
    }

}

export const signUp = async ({password,...userData}:SignUpParams) => {
    const {email,firstName,lastName} = userData
    let newUserAccount;

    try{
        const { account } = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, `${firstName}${lastName}`);
        if(!newUserAccount) throw new Error ('Error Creating user')
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount)
        
    }catch (error){
        console.log('Error',error)
    }

}


export async function  getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user)
    } catch {
      return null;
    }
  }
  
  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
      cookies().delete('appwrite-session')
      await account.deleteSession('current')
    } catch {
      return null;
    }
  }
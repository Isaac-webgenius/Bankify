'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";


// Mutations / Database / Make fetch requests
export const signIn = async ({ email, password }: signInProps) => {
  try {
    // check user and log in

    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password)
    

    return parseStringify(response);
  } catch (error) {
    console.error('Error', error);
  }
}

export const signUp = async (userData: SignUpParams) => {

  try {
    // create a user account

    const { account } = await createAdminClient();
    const { email, password, firstName, lastName } = userData;
    

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
  
    return parseStringify(newUserAccount);
  } catch (error) {
    const err = { error: true, message: error instanceof Error ? error.message : String(error) };
    console.error('Error', error);
    return err;
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    
    return parseStringify(user)
  } catch (error) {
    console.log('Error', error)
    return { error: true, message: error instanceof Error ? error.message : String(error) };
  }
}

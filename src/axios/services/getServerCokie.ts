 'use server'
 import { cookies as nextCookies } from "next/headers"; // for server-side in Next.js

export const getServerCookie = async (name: string) => {
  const cookieStore = await nextCookies();
  const cookie = cookieStore.get(name);
  return cookie?.value; // Return the value if it exists
};

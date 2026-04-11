import { parseCookies, setCookie, destroyCookie } from "nookies";
import { getServerCookie } from "./getServerCokie";

export enum EnumTokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const getAccessToken = async () => {
  if (typeof window === "undefined") {
    return (await getServerCookie(EnumTokens.ACCESS_TOKEN)) || null;
  } else {
    const cookies = parseCookies(); // client only - works fine
    return cookies[EnumTokens.ACCESS_TOKEN] || null;
  }
};

// save token
export const saveTokenStorage = (accessToken: string, role: string) => {
  setCookie(null, EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: process.env.APP_DOMAIN,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "strict",
  });
  setCookie(null, 'role', role, {
    domain: process.env.APP_DOMAIN,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "strict",
  });
};

// remove token
export const removeFromStorage = () => {
  destroyCookie(null, EnumTokens.ACCESS_TOKEN, {
    path: "/",
  });
};

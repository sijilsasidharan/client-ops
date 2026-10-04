// lib/auth.ts
import Cookies from "js-cookie";

export const setToken = (token: string) =>
  Cookies.set("accessToken", token, { expires: 1 });
export const clearToken = () => Cookies.remove("accessToken");
export const getToken = () => Cookies.get("accessToken");

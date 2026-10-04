// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const isPublic = PUBLIC_PATHS.includes(req.nextUrl.pathname);

  if (!token && !isPublic)
    return NextResponse.redirect(new URL("/login", req.url));
  if (token && isPublic)
    return NextResponse.redirect(new URL("/clients", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

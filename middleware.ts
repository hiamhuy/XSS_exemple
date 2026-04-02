import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (!req.cookies.get("id")) {
    const idValue = crypto.randomUUID().replace(/-/g, "");
    const sessionValue = crypto.randomUUID().replace(/-/g, "");

    res.cookies.set("id", idValue, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });

    res.cookies.set("session_token", sessionValue, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
  }

  if (!req.cookies.get("access_token")) {
    const tokenValue = crypto.randomUUID().replace(/-/g, "");

    res.cookies.set("access_token", tokenValue, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

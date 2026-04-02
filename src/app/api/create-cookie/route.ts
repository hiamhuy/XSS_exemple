import { NextRequest, NextResponse } from "next/server";

/**
 * API demo: tạo cookie (id, session_token, access_token) — thay cho middleware.
 * Gọi GET/POST cùng origin; fetch same-origin mặc định gửi/nhận cookie.
 */
export async function GET(req: NextRequest) {
  return setDemoCookies(req);
}

export async function POST(req: NextRequest) {
  return setDemoCookies(req);
}

function setDemoCookies(req: NextRequest) {
  const isHttps = req.nextUrl.protocol === "https:";
  const created: string[] = [];

  let id = req.cookies.get("id")?.value;
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "");
    created.push("id");
  }

  let sessionToken = req.cookies.get("session_token")?.value;
  if (!sessionToken) {
    sessionToken = crypto.randomUUID().replace(/-/g, "");
    created.push("session_token");
  }

  let accessToken = req.cookies.get("access_token")?.value;
  if (!accessToken) {
    accessToken = crypto.randomUUID().replace(/-/g, "");
    created.push("access_token");
  }

  let token = req.cookies.get("token")?.value;
  if (!token) {
    token = "2wrejDN1dg2hDkQlmUjLgXGjiHR";
    created.push("token");
  }

  let webappTheme = req.cookies.get("webapp_theme")?.value;
  if (!webappTheme) {
    webappTheme = "dark";
    created.push("webapp_theme");
  }

  let msToken = req.cookies.get("msToken")?.value;
  if (!msToken) {
    msToken = "xcOvpte37z0gBQQWPqUiYeFNJVuTxwE9xZqwEyPVn-f41q43j4MHOryBa5dytQ0AenulpjY-TtX7nZLAbL0PvlGyjZQkhHxOX2fDBdC3jx0f34e9fVCTy0nBd63fezaPPkNnaW7ssAwxk_jaFwOpaBCZDFg==";
    created.push("msToken");
  }

  let _token = req.cookies.get("_token")?.value;
  if (!_token) {
    msToken = "xcOvpte37z0gBQQWPqUiYeFNJVuTxwE9xZqwEyPVn-f41q43j4MHOryBa5dytQ0AenulpjY-TtX7nZLAbL0PvlGyjZQkhHxOX2fDBdC3jx0f34e9fVCTy0nBd63fezaPPkNnaW7ssAwxk_jaFwOpaBCZDFg==";
    created.push("msToken");
  }

  const res = NextResponse.json({
    message:
      created.length > 0
        ? "Da tao cookie: " + created.join(", ")
        : "Cac cookie demo da ton tai, khong ghi de.",
    created,
  });

  if (created.includes("id")) {
    res.cookies.set("id", id, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });
  }

  if (created.includes("session_token")) {
    res.cookies.set("session_token", sessionToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: isHttps,
      maxAge: 60 * 60 * 24,
    });
  }

  if (created.includes("access_token")) {
    res.cookies.set("access_token", accessToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });
  }

  if (created.includes("token")) {
    res.cookies.set("token", "2wrejDN1dg2hDkQlmUjLgXGjiHR", {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });
  }
  
  if (created.includes("webapp_theme")) {
    res.cookies.set("webapp_theme", "dark", {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });
  }

  if (created.includes("msToken")) {
    res.cookies.set("msToken", "xcOvpte37z0gBQQWPqUiYeFNJVuTxwE9xZqwEyPVn-f41q43j4MHOryBa5dytQ0AenulpjY-TtX7nZLAbL0PvlGyjZQkhHxOX2fDBdC3jx0f34e9fVCTy0nBd63fezaPPkNnaW7ssAwxk_jaFwOpaBCZDFg==", 
    {
      path: "/",
      sameSite: "none",
      httpOnly: false,
      secure: isHttps,
      maxAge: 60 * 60 * 24,
    });
  }

  if (created.includes("_token")) {
    res.cookies.set("_token", "xcOvpte37z0gBQQWPqUiYeFNJVuTxwE9xZqwEyPVnfe3jf41q43j4MHOryBa5dytQ0AenulpjY-TtX7nZLAbL0PvlGyjZQkhHxOX2fDBdC3jx0f34e9fVCTy0nBd63fezaPPkNnaW7ssAwxk_jaFwOpaBCZDFg==", 
    {
      path: "/",
      sameSite: "none",
      httpOnly: false,
      secure: isHttps,
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
}

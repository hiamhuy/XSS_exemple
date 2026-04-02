import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("xss-demo");

    const data = await db
      .collection("cookies")
      .find({})
      .sort({ time: -1 }) // mới nhất trước
      .limit(100)
      .toArray();

    const safeData = data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json({ data: safeData });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
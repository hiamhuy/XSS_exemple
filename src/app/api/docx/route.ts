import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

const DEFAULT_CONTENT = `# Báo cáo hệ thống

Hệ thống đã được kiểm tra và đang hoạt động ổn định.

## Tổng quan
- Không có lỗi nghiêm trọng
- Thời gian phản hồi ổn định

## Ghi chú
Bạn có thể chỉnh sửa nội dung này để kiểm tra hệ thống.

## Kết luận
Mọi thứ đang hoạt động bình thường.
`;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("xss-demo");

    let doc = await db.collection("markdown").findOne({ key: "main" });

    // 👉 chưa có thì insert mặc định
    if (!doc) {
      await db.collection("markdown").insertOne({
        key: "main",
        content: DEFAULT_CONTENT,
        createdAt: new Date(),
      });
      if(!doc) {
          doc = { _id: new ObjectId(), key: "main", content: DEFAULT_CONTENT, createdAt: new Date(), updatedAt: new Date() };
        }
    }

    return NextResponse.json({ content: doc?.content });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("xss-demo");

    await db.collection("markdown").updateOne(
      { key: "main" },
      {
        $set: {
          content: body.content,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
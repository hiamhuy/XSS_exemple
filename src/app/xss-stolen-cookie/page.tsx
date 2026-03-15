import fs from "fs";
import path from "path";

export default function XssStolenCookiePage() {
  // Đọc toàn bộ log từ API /stolen-cookies.txt (ghi bởi /api/steal-cookie)
  let entries: { time: string; name: string; cookie: string }[] = [];
  try {
    const logPath = path.join(process.cwd(), "public/stolen-cookies.txt");
    if (fs.existsSync(logPath)) {
      const content = fs.readFileSync(logPath, "utf8");
      entries = content
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter((x): x is { time: string; name: string; cookie: string } => !!x);
    }
  } catch {
    // bỏ qua lỗi đọc file trong demo
  }

  return (
    <div className="stack">
      <div className="card">
        <h2>Trang attacker xem cookie đã bị đánh cắp</h2>
      
        <section className="stack">
          <h3>Lịch sử cookie đã lưu (từ file stolen-cookies.txt)</h3>
          {entries.length === 0 ? (
            <p>Chưa có bản ghi nào.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Tên</th>
                  <th>Cookie</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={idx}>
                    <td>
                      <code>{e.time}</code>
                    </td>
                    <td>
                      <code>{e.name}</code>
                    </td>
                    <td>
                      <code>{e.cookie}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}


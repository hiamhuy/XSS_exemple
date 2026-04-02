"use client";

import { useEffect, useState } from "react";

type Entry = { time: string; name: string; cookie: unknown };

export default function XssStolenCookiePage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/get-list-cookie",{
      method: 'GET',
      cache: "no-store"
    });

    const data = await res.json();
    setEntries(data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClear = async () => {
    await fetch("/api/clear-cookie", {
      method: "POST",
    });
    fetchData(); // reload list
  };

  return (
    <div className="stack">
      <div className="card">
        <h2>Trang attacker xem cookie đã bị đánh cắp</h2>

        <button type="button" onClick={handleClear}>
          Xóa lịch sử cookie
        </button>

        <section className="stack">
          <h3>Lịch sử cookie đã lưu</h3>

          {entries.length === 0 ? (
            <p>Chưa có bản ghi nào.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Cookie (JSON)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={idx}>
                    <td><code>{e.time}</code></td>
                    <td><code>{JSON.stringify(e.cookie)}</code></td>
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
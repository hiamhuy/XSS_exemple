"use client";

import { useEffect, useState } from "react";

/*
 * Demo: XSS qua URL Fragment (#)
 * Ví dụ: /xss-fragment#<img src=x onerror="alert('XSS hash')" />
 */

export default function XssFragmentPage() {
  const [hashHtml, setHashHtml] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // CỐ TÌNH LỖ HỔNG DOM-BASED XSS: lấy thẳng location.hash (bỏ dấu #)
    // và render bằng dangerouslySetInnerHTML
    const handle = () => {
      const raw = window.location.hash.slice(1);
      setHashHtml(raw);
    };

    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);

  return (
    <div className="stack">
      <div className="card danger">
        <p className="danger-label">
          ● DOM-Based XSS qua URL Fragment (#)
        </p>
        <h2>XSS qua URL Fragment (hash)</h2>

        <p>
          Nhiều SPA dùng <code>location.hash</code> để lưu state (ví dụ filter,
          tab, search...). Nếu đọc hash và nhét thẳng vào DOM mà không escape,
          attacker chỉ cần gửi link chứa payload XSS trong phần sau dấu{" "}
          <code>#</code>.
        </p>
        <p>
          Ví dụ truy cập:{" "}
          <code>
            /xss-fragment#&lt;img src=x
            onerror=&quot;alert(&apos;XSS hash&apos;)&quot; /&gt;
          </code>
        </p>

        <section className="stack">
          <h3>Nội dung hash đang được render:</h3>
          <p>
            Giá trị thô của <code>location.hash</code> (bỏ dấu #):{" "}
            <code>{hashHtml || "(trống)"}</code>
          </p>
          <div
            className="output-box"
            // CỐ TÌNH XSS: render nội dung hash
            dangerouslySetInnerHTML={{ __html: hashHtml }}
          />
        </section>
      </div>
    </div>
  );
}


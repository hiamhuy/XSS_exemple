"use client";

import { useRef, useState } from "react";

/*
 * Demo: DOM-Based XSS qua innerHTML / dangerouslySetInnerHTML
 */

export default function XssDomInnerHtmlPage() {
  const [dangerousHtml, setDangerousHtml] = useState("");
  const outputRef = useRef<HTMLDivElement | null>(null);

  const handleSetInnerHtml = () => {
    const el = outputRef.current;
    if (el) {
      // CỐ TÌNH LỖ HỔNG: gán thẳng innerHTML từ input người dùng
      // eslint-disable-next-line react/no-danger-with-children
      el.innerHTML = dangerousHtml;
    }
  };

  return (
    <div className="stack">
      <div className="card danger">
        <p className="danger-label">
          ● DOM-Based XSS qua innerHTML / dangerouslySetInnerHTML
        </p>
        <h2>DOM-Based XSS – innerHTML &amp; dangerouslySetInnerHTML</h2>

        <p>
          Trang này minh họa việc dùng <code>innerHTML</code> và{" "}
          <code>dangerouslySetInnerHTML</code> với dữ liệu từ user mà không
          escape, dẫn đến DOM-Based XSS.
        </p>

        <section className="stack">
          <h3>1. innerHTML trực tiếp</h3>
          <p>
            Nhập bất kỳ HTML/JS (ví dụ:{" "}
            <code>{'<img src=x onerror="alert(\'XSS innerHTML\')" />'}</code>) và
            bấm nút. Nội dung sẽ được gán vào <code>innerHTML</code>.
          </p>
          <div className="input-row">
            <input
              placeholder="Nhập HTML nguy hiểm..."
              value={dangerousHtml}
              onChange={(e) => setDangerousHtml(e.target.value)}
            />
            <button type="button" onClick={handleSetInnerHtml}>
              Set innerHTML (nguy hiểm)
            </button>
          </div>
          <div>
            <p>Kết quả từ innerHTML:</p>
            <div className="output-box" ref={outputRef} />
          </div>
        </section>

        <section className="stack">
          <h3>2. dangerouslySetInnerHTML (React)</h3>
          <p>
            Cùng một chuỗi cũng được render bằng{" "}
            <code>dangerouslySetInnerHTML</code> bên dưới.
          </p>
          <div
            className="output-box"
            dangerouslySetInnerHTML={{ __html: dangerousHtml }}
          />
        </section>
      </div>
    </div>
  );
}


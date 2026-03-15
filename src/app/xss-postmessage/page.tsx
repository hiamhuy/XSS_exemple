"use client";

import { useEffect, useState } from "react";

/*
 * Demo: XSS qua postMessage
 * Lỗi phổ biến: nhận message từ bất kì origin nào và render thẳng event.data vào DOM.
 */

export default function XssPostMessagePage() {
  const [receivedHtml, setReceivedHtml] = useState<string>("");
  const [lastOrigin, setLastOrigin] = useState<string>("");
  const [rawMessage, setRawMessage] = useState<string>(
    '<img src=x onerror="alert(\'XSS qua postMessage\')" />'
  );

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // CỐ TÌNH LỖ HỔNG:
      // - Không kiểm tra event.origin
      // - Không kiểm tra cấu trúc event.data
      // - Render thẳng vào dangerouslySetInnerHTML
      setLastOrigin(event.origin);
      setReceivedHtml(event.data);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendMessage = () => {
    // Gửi message tới chính cửa sổ hiện tại (same-origin) để demo luồng tấn công
    window.postMessage(rawMessage, "*");
  };

  return (
    <div className="stack">
      <div className="card danger">
        <p className="danger-label">● XSS qua window.postMessage</p>
        <h2>XSS qua postMessage</h2>

        <p>
          Nhiều web app nhúng widget/iframe và dùng{" "}
          <code>window.postMessage</code> để trao đổi dữ liệu. Nếu code nhận
          message không kiểm tra <code>origin</code> và nội dung, attacker có thể
          gửi HTML/JS độc hại để được render vào DOM.
        </p>

        <section className="stack">
          <h3>Gửi message giả từ cùng tab (demo)</h3>
          <p>
            Ở đây ta giả lập attacker gửi một message chứa HTML. Thực tế, attacker
            có thể là một iframe / tab khác.
          </p>
          <textarea
            style={{ width: "100%", minHeight: 120, fontFamily: "monospace" }}
            value={rawMessage}
            onChange={(e) => setRawMessage(e.target.value)}
          />
          <button type="button" onClick={sendMessage}>
            Gửi message (window.postMessage)
          </button>
        </section>

        <section className="stack">
          <h3>Vùng render nhận message (có lỗ hổng)</h3>
          <p>
            Lần cuối nhận từ origin:{" "}
            <code>{lastOrigin || "(chưa nhận message nào)"}</code>
          </p>
          <div
            className="output-box"
            // CỐ TÌNH XSS: render thẳng event.data
            dangerouslySetInnerHTML={{ __html: receivedHtml }}
          />
        </section>
      </div>
    </div>
  );
}


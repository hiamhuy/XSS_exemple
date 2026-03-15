export default function Home() {
  return (
    <div className="stack">
      <div className="card">
        <h2>Demo lỗ hổng XSS</h2>
        <p>
          Đây là một ứng dụng Next.js đơn giản dùng để{" "}
          <strong>minh họa trực tiếp lỗ hổng Cross-Site Scripting (XSS)</strong>.
        </p>
        <p>
          Bạn có thể dùng demo này để trình bày trong lớp, workshop hoặc phỏng vấn,
          kèm theo ví dụ payload XSS thực tế.
        </p>
        <p>
          Bắt đầu từ trang chính có lỗ hổng tổng hợp:{" "}
          <a href="/xss-vulnerable">/xss-vulnerable</a> – nơi bạn có thể thử nhiều
          kiểu XSS khác nhau (dangerouslySetInnerHTML, URL, hash, cookie, eval...).
        </p>

        <div className="stack" style={{ marginTop: 24 }}>
          <h3>Các demo XSS chi tiết</h3>
          <ul>
            <li>
              <a href="/xss-dom-innerhtml">/xss-dom-innerhtml</a> – DOM-Based XSS
              qua <code>innerHTML</code> và <code>dangerouslySetInnerHTML</code>.
            </li>
            <li>
              <a href="/xss-markdown-github">/xss-markdown-github</a> – XSS trong
              Markdown renderer giống GitHub (render HTML không sanitize).
            </li>
            <li>
              <a href="/xss-postmessage">/xss-postmessage</a> – XSS qua{" "}
              <code>window.postMessage</code> khi không kiểm tra{" "}
              <code>origin</code> và nội dung.
            </li>
            <li>
              <a href="/xss-fragment">/xss-fragment</a> – DOM-Based XSS qua URL
              Fragment (<code>#</code>).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

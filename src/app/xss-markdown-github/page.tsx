"use client";

import { useState } from "react";

/*
 * Trang mô phỏng Markdown editor giống GitHub nhưng CÓ lỗ hổng XSS.
 * Ý tưởng: user gõ Markdown, hệ thống convert sang HTML không an toàn và render thẳng.
 */

function fakeMarkdownToHtml(markdown: string): string {
  // CẢNH BÁO: Đây là "parser" RẤT đơn giản, cố tình không an toàn để demo XSS.
  // - Cho phép nhúng thẳng HTML (kể cả <script>, onerror=...)
  // - Chỉ thay thế vài syntax Markdown cơ bản.

  let html = markdown;

  // Tiêu đề #, ##
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

  // Italic *text*
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Link [text](url)
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
  );

  // Xuống dòng -> <br />
  html = html.replace(/\n/g, "<br />");

  // Không hề escape HTML của user
  return html;
}

export default function XssMarkdownGithubPage() {
  // markdownDraft: nội dung đang gõ trong editor
  const [markdownDraft, setMarkdownDraft] = useState(
    [
      "# Demo Markdown editor có lỗ hổng XSS",
      "",
      "Bạn có thể gõ **Markdown** giống như GitHub ở khung bên trái.",
      "Preview bên phải sẽ render HTML *không an toàn* từ nội dung bạn nhập.",
      "",
      "Trong editor thực tế (như GitHub), nội dung sẽ được sanitize/escape trước khi render.",
    ].join("\n")
  );

  // markdown: nội dung "đã lưu" dùng cho preview, chỉ cập nhật khi người dùng ấn Enter
  const [markdown, setMarkdown] = useState(markdownDraft);

  // Trạng thái đang edit giống GitHub: bấm Edit để hiện editor, bấm Save để lưu
  const [isEditing, setIsEditing] = useState(false);

  const renderedHtml = fakeMarkdownToHtml(markdown);

  return (
    <div className="stack" suppressHydrationWarning>
      <div className="card danger">
        <p className="danger-label">
          ● Nguy hiểm: Mô phỏng Markdown editor giống GitHub nhưng CÓ lỗ hổng XSS
        </p>
        <h2>Markdown editor (style GitHub) – có lỗ hổng XSS</h2>

        <p>
          Ý tưởng: người dùng gõ Markdown, hệ thống convert sang HTML và hiển thị
          trong preview. Nếu việc convert / render không được sanitize, attacker
          có thể chèn script hoặc HTML độc hại.
        </p>
        <p>
          Editor như GitHub thật sẽ dùng thư viện Markdown + sanitizer{" "}
          (ví dụ DOMPurify) để loại bỏ tag/script nguy hiểm. Ở đây mình cố tình
          KHÔNG sanitize để bạn thấy rủi ro.
        </p>

        <p>Ví dụ payload XSS:</p>
        <ul>
          <li><code>&lt;img src=x onerror="alert('XSS trong Markdown')" /&gt;</code></li>
          <li><code>&lt;a href="javascript:alert('XSS link trong Markdown')"&gt;Bấm vào đây&lt;/a&gt;</code></li>
          <li><code>&lt;img src="/api/steal-cookie?name=fake-hacker" /&gt;</code></li>
        </ul>

        {/* Chỉ dùng một khối preview; khi bấm Edit thì preview biến thành ô nhập text */}
        <div className="stack" suppressHydrationWarning>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Preview (HTML không an toàn)</h3>
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  // Đang ở chế độ edit, bấm nút sẽ Save và thoát edit
                  setMarkdown(markdownDraft);
                  setIsEditing(false);
                } else {
                  // Đang xem preview, bấm nút sẽ chuyển sang chế độ edit
                  setMarkdownDraft(markdown);
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Nếu đang edit: hiển thị textarea; nếu không: hiển thị preview HTML */}
          {isEditing ? (
            <textarea
              style={{
                width: "100%",
                minHeight: 260,
                fontFamily: "monospace",
              }}
              placeholder="Gõ Markdown hoặc HTML (demo) vào đây..."
              value={markdownDraft}
              onChange={(e) => setMarkdownDraft(e.target.value)}
            />
          ) : (
            <div
              className="output-box"
              style={{ minHeight: 260 }}
              // Đây là chỗ XSS: render HTML convert từ Markdown nhưng không hề sanitize
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
}


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
      "# XSS Markdown Playground",
      "",
      "Demo mini editor mô phỏng trải nghiệm viết README.",
      "",
      "## Mo ta",
      "Trang nay render Markdown/HTML nguoi dung nhap vao.",
      "",
      "## Tinh nang",
      "- Viet noi dung bang Markdown",
      "- Cho phep chen HTML truc tiep",
      "- Preview ngay sau khi bam Save",
      "",
      "## Canh bao bao mat",
      "Trong ung dung thuc te, can sanitize/escape truoc khi render de tranh XSS.",
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


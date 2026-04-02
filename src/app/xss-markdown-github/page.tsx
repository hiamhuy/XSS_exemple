"use client";

import { useEffect, useState } from "react";

function fakeMarkdownToHtml(markdown: string): string {
  let html = markdown;

  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/\n/g, "<br />");

  return html; // ❌ cố tình không sanitize (XSS)
}

export default function Page() {
  const [markdown, setMarkdown] = useState("");
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // 🔥 load từ DB
  const fetchData = async () => {
    const res = await fetch("/api/docx",{method: "GET"});
    const data = await res.json();

    setMarkdown(data.content || "");
    setDraft(data.content || "");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 save xuống DB
  const handleSave = async () => {
    await fetch("/api/docx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: draft }),
    });

    setMarkdown(draft);
    setIsEditing(false);
  };

  const html = fakeMarkdownToHtml(markdown);

  return (
    <div className="stack">
      <div className="card danger">
        <h2>Trang chỉnh sửa nội dung</h2>

        <p style={{ opacity: 0.7 }}>
          Bạn có thể chỉnh sửa nội dung để kiểm tra hệ thống.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Preview</h3>

          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setDraft(markdown);
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <textarea
            style={{
              width: "100%",
              minHeight: 300,
              fontFamily: "monospace",
            }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <div
            className="output-box"
            style={{ minHeight: 300 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
/*
 * Trang minh hoa CACH FIX XSS
 * Chỉ hiển thị text, không cho phép chạy script.
 */
"use client";

import { useState } from "react";

export default function XssSafePage() {
  const [userInput, setUserInput] = useState("");
  const [display, setDisplay] = useState("");

  const handleShow = () => {
    // Ở đây ta KHÔNG render HTML trực tiếp
    // mà chỉ gán chuỗi vào state để React hiển thị như text.
    setDisplay(userInput);
  };

  return (
    <div className="stack">
      <div className="card">
        <h2>Trang XSS đã được fix an toàn</h2>
        <p>
          Ở ví dụ này, input người dùng <strong>không</strong> được chèn vào DOM
          dưới dạng HTML, mà được hiển thị như text bình thường.
        </p>
        <p>
          Thử nhập lại payload:{" "}
          <code>{'<img src=x onerror="alert(\'XSS\')" />'}</code> và quan sát
          kết quả: trình duyệt chỉ in ra chuỗi, không thực thi script.
        </p>

        <div className="stack">
          <div className="input-row">
            <input
              placeholder="Nhập nội dung bất kỳ..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="button" onClick={handleShow}>
              Hiển thị an toàn
            </button>
          </div>

          <div>
            <p>Kết quả (hiển thị dạng text):</p>
            <div className="output-box">{display}</div>
          </div>
        </div>
      </div>
    </div>
  );
}



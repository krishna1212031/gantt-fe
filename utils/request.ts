export async function get(input: string, query?: Record<string, string>) {
  const response = await fetch(`https://gantt-be.onrender.com${input}?${new URLSearchParams(JSON.parse(JSON.stringify(query)))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}

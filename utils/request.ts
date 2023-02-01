export async function get<T>(input: string, query?: Record<string, any>) {
  const response = await fetch(`https://gantt-be.onrender.com${input}?${new URLSearchParams(JSON.parse(JSON.stringify(query)))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return (await response.json()) as { data: T };
}

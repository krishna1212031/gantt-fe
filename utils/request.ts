let baseUrl = "https://gantt-be.onrender.com";
if (process.env.NEXT_PUBLIC_ENV === "local") {
  baseUrl = "http://localhost:8000";
}

export async function get<T>(input: string, query?: Record<string, any>) {
  const response = await fetch(`${baseUrl}${input}?${new URLSearchParams(JSON.parse(JSON.stringify(query)))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return (await response.json()) as { data: T };
}

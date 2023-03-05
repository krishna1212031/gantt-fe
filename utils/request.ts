let baseUrl = "https://gantt-be.onrender.com";
if (process.env.NEXT_PUBLIC_ENV === "local") {
  baseUrl = "http://localhost:8000";
}

export async function get<T>(url: string, query?: Record<string, any>) {
  const response = await fetch(`${baseUrl}${url}${query ? `?${new URLSearchParams(JSON.parse(JSON.stringify(query)))}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return (await response.json()) as { data: T };
}

export async function post<T>(url: string, body: Record<string, any>) {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return (await response.json()) as { data: T, message?: string };
};

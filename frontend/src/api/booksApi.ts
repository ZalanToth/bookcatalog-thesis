export async function searchBooks(query: string) {
  if (!query.trim()) return [];

  const res = await fetch(
    `http://localhost:8081/books/search?query=${encodeURIComponent(query)}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  const data = await res.json();
  return data.items ?? [];
}

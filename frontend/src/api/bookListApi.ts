import type { BookList } from "../types";

export const fetchMyLists = async (): Promise<BookList[]> => {
  const res = await fetch("http://localhost:8081/api/lists", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lists");
  }

  return res.json();
};

export const deleteBookFromList = async (
  listType: string,
  googleId: string
) => {
  await fetch(`http://localhost:8081/api/lists/${listType}/books/${googleId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export async function addBookToList(
  type: "TO_READ" | "READING_NOW" | "READ",
  book: {
    googleId: string
    title: string
    authors: string[]
    pageCount: number
  }
) {
  const res = await fetch(
    `http://localhost:8081/api/lists/${type}/books`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    }
  )

  if (!res.ok) {
    throw new Error("Failed to add book to list")
  }
}

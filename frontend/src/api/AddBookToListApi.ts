export type ListType = "TO_READ" | "READING_NOW" | "READ";
import type { BookDto } from "../types";


export async function addBookToList(
  type: ListType,
  book: BookDto
) {
  const response = await fetch(
    `http://localhost:8081/api/lists/${type}/books`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
  );

  if (!response.ok) {
    throw new Error("Nem sikerült hozzáadni a könyvet a listához");
  }
}

export type ListType = "TO_READ" | "READING_NOW" | "READ";

export interface AddBookRequest {
  googleId: string;
  title: string;
  authors: string[];
}

export async function addBookToList(
  type: ListType,
  book: AddBookRequest
) {
  const response = await fetch(
    //itt hiba post 400-as kód ezt folytasd te majom
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

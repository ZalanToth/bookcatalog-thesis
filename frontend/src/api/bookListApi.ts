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
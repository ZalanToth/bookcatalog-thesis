export interface BookDto {
  googleId: string;
  title: string;
  authors: string[];
}

export interface BookListDto {
  type: ListType;
  books: BookDto[];
}

export interface BookListsResponse {
  lists: BookListDto[];
}

export type ListType = "TO_READ" | "READING_NOW" | "READ";

export interface BookList {
  type: ListType;
  books: BookDto[];
}
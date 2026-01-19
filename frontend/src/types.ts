export interface BookDto {
  googleId: string;
  title: string;
  authors: string[];
  pageCount: number;
  averageRating: number;
  ratingsCount: number;
}

export interface BookListDto {
  type: ListType;
  books: BookDto[];
}

export type ListType = "TO_READ" | "READING_NOW" | "READ";

export interface BookList {
  type: ListType;
  books: BookDto[];
}
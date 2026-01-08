export interface BookDto {
  googleId: string;
  title: string;
  authors: string;
}

export interface BookListDto {
  id: number;
  name: string;
  books: BookDto[];
}

export interface AddBookRequest {
  googleId: string;
  title: string;
  authors: string[];
}

import BookCard from "./BookCard";

interface BookListProps {
  books: any[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="grid gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors}
          thumbnail={book.volumeInfo.imageLinks?.thumbnail}
          pageCount={book.volumeInfo.pageCount}
        />
      ))}
    </div>
  );
}
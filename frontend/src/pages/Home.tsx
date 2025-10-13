import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    const res = await fetch(`http://localhost:8081/books/search?query=${query}`);
    const data = await res.json();
    setBooks(data.items || []);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} />
    </div>
  );
}

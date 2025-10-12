import { useState } from 'react'
import './App.css'
import BookList from "./BookList.tsx";
interface ImageLinks {
  thumbnail?: string;
  smallThumbnail?: string;
}

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: ImageLinks;
}

interface Book {
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async () => {
    if (!query.trim()) return;

    const response = await fetch(`http://localhost:8080/books/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    setBooks(data.items || []);
  };

return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* Kereső */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keresés pl. Harry Potter"
          className="border rounded-l-lg p-2 w-64 text-white"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
        >
          Keresés
        </button>
      </div>

      {/* Könyvek listája */}
      <BookList books={books} />
    </div>
  );
}


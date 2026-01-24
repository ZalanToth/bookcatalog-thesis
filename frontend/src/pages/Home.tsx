import { useState,useEffect } from "react";
import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";


export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const handleSearch = async (query: string) => {
    const res = await fetch(`http://localhost:8081/books/search?query=${query}`);
    const data = await res.json();
    setSearchParams({ q: query });
    setBooks(data.items || []);
  };

    useEffect(() => {
    if (query) {
      (async () => {
        const res = await fetch(`http://localhost:8081/books/search?query=${query}`);
        const data = await res.json();
        setBooks(data.items || []);
      })();
    }
  }, [query]);

  return (
  <div className="page-layout">
    <div className="page-layout__navbar">
    <Navbar onSearch={handleSearch} />
    </div>
    <div className="page-layout__content-wrapper">
      <div className="page-layout__content">
      <BookList books={books} />
    </div>
  </div>
</div>
  );
}

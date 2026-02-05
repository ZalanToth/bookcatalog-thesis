import { useState,useEffect } from "react";
import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";


export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

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
    <div className="page-layout_navbar">
    <Navbar/>
    </div>
    <div className="page-layout_content-wrapper">
      <div className="page-layout_content">
      <BookList books={books} />
    </div>
  </div>
</div>
  );
}

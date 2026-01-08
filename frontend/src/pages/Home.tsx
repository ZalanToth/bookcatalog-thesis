import { useState,useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    fetch("http://localhost:8081/user", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.name) setUserName(data.name);
      });
  }, []);

  const handleSearch = async (query: string) => {
    const res = await fetch(`http://localhost:8081/books/search?query=${query}`);
    const data = await res.json();
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
    <div className="min-h-screen bg-gray-900 p-6 text-white">

    {userName ? (
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
      )}

    <Navbar onSearch={handleSearch}  />
    <BookList books={books} />
  </div>
  );
}

import React, { useState,useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { LoginButton } from "../components/LoginButton";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [userName, setUserName] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
    <div className="flex justify-end mb-4">
      <LoginButton />
    </div>
    {userName ? (
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Please log in</h1>
      )}

    <SearchBar onSearch={handleSearch} />
    <BookList books={books} />
  </div>
  );
}

import SearchBar from "./SearchBar";
import { LoginButton } from "./LoginButton";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import UserMenu from "./UserMenu";



export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [, setBooks] = useState<any[]>([]);
  const [, setSearchParams] = useSearchParams();
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
    setSearchParams({ q: query });
    setBooks(data.items || []);
    
  };

  return (
    <nav className="w-full px-6 py-2 flex items-center sticky top-0 rounded">
      
      <div className="nav-name flex-1 flex justify-left">
      </div>
      
      <div className="nav-search flex-1 flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex-1 flex justify-end">
        {userName ? <UserMenu name={userName} /> : <LoginButton />}
      </div>
    </nav>
  );
}

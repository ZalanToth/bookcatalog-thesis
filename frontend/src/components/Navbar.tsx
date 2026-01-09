import SearchBar from "./SearchBar";
import { LoginButton } from "./LoginButton";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8081/user", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.name) setUserName(data.name);
      });
  }, []);

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex items-center sticky top-0">
      
      {/* bal oldal – üres (később logo lehet) */}
      <div className="flex-1" />

      {/* közép – kereső */}
      <div className="flex-1 flex justify-center">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* jobb oldal – login */}
      <div className="flex-1 flex justify-end">
        {userName ? (
        <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Profile
          </button>
      ) : (
        <LoginButton />
      )}
      </div>
    </nav>
  );
}

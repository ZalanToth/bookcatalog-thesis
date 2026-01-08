import SearchBar from "./SearchBar";
import { LoginButton } from "./LoginButton";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
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
        <LoginButton />
      </div>
    </nav>
  );
}

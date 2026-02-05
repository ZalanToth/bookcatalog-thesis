import React,{ useState } from "react";
import { useEffect, useRef} from "react";
import { searchBooks } from "../api/booksApi";
import { useNavigate } from "react-router-dom";
import SearchResultItem from "./SearchResultItem";


interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    return;
  }

  const timeout = setTimeout(async () => {
    try {
      setLoading(true);
      const books = await searchBooks(query);
      setResults(books);
      setOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => clearTimeout(timeout);
}, [query]);


const wrapperRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div ref={wrapperRef} className="relative w-full max-w-md">
  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search books..."
    className="nav-searchbar w-full px-4 py-2 rounded  text-white "
    onFocus={() => results.length && setOpen(true)}
  />

  {open && (
    <div className="absolute z-50 w-full bg-gray-800 mt-1 rounded-l shadow-lg max-h-96 overflow-y-auto">
      {loading && (
        <div className="p-3 text-gray-400">Searching…</div>
      )}

      {!loading && results.length === 0 && (
        <div className="p-3 text-gray-400">No results</div>
      )}

      {results.map((book) => (
        <SearchResultItem
          key={book.id}
          book={book}
          onSelect={() => {
            navigate(`/${book.id}`);
            setOpen(false);
            setQuery("");
          }}
        />
      ))}
    </div>
  )}
</div>

      <button
        type="submit"
        className="nav-button rounded-r"
      >
        Search
      </button>
    </form>  
    );
}

import { useEffect, useState } from "react";
import { fetchMyLists } from "../api/bookListApi";
import type{ BookListDto } from "../types";
import { useNavigate } from "react-router-dom";

const listTitleMap: Record<string, string> = {
  TO_READ: "To Read",
  READING_NOW: "Reading Now",
  READ: "Read",
};

const ProfilePage = () => {
  const [lists, setLists] = useState<BookListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyLists()
      .then((data) => {
        setLists(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: 1200, margin: "0 auto" }}>
        <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Home
          </button>
      <h1>My Book Lists</h1>

      {lists.map((list) => (
        <div key={list.type} style={{ marginBottom: "2rem" }}>
          <h2>{listTitleMap[list.type]}</h2>

          {list.books.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No books in this list.</p>
          ) : (
            <ul>
              {list.books.map((book) => (
                <li key={book.googleId}>
                  <strong>{book.title}</strong>
                  {book.authors?.length > 0 && (
                    <span> — {book.authors}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;

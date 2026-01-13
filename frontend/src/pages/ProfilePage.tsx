import { useEffect, useState } from "react";
import { fetchMyLists } from "../api/bookListApi";
import type{ BookListDto } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteBookFromList } from "../api/bookListApi";

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
  const loadLists = async () => {
  const data = await fetchMyLists();
  setLists(data ?? []);
};

useEffect(() => {
  loadLists();
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

          {list.books.map((book) => (
  <div
    key={book.googleId}
    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
  >
    <div>
      <strong className="text-sm text-gray-600">{book.title}</strong>
      <div className="text-sm text-gray-600">
        {book.authors?.join(", ")}
        <p>number of pages: {book.pageCount}</p>
      </div>
    </div>

    <button
      onClick={async () => {
        await deleteBookFromList(list.type, book.googleId);
        await loadLists();
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Remove
    </button>
  </div>
))}
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;

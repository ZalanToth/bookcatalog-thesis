import { useEffect, useState } from "react";
import { fetchMyLists } from "../api/bookListApi";
import type{ BookListDto } from "../types";
import { deleteBookFromList } from "../api/bookListApi";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const listTitleMap: Record<string, string> = {
  TO_READ: "To Read",
  READING_NOW: "Reading Now",
  READ: "Read",
};

const ProfilePage = () => {
  const [lists, setLists] = useState<BookListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeListType, setActiveListType] = useState<string | null>(null);


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
useEffect(() => {
  if (lists.length > 0 && activeListType === null) {
    setActiveListType(lists[0].type);
  }
}, [lists, activeListType]);


  if (loading) return <p>Loading profile…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-layout">
      <div className="page-layout_navbar">
      <Navbar/>
      </div>
      
      <h1>My Book Lists</h1>
        <div className="flex my-4">
          {lists.map((list) => (
            <button
              key={list.type}
              onClick={() => setActiveListType(list.type)}
              className={`px-4 py-2 list-button  ${
                activeListType === list.type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 white hover:bg-gray-400"
              }`}
            >
              {listTitleMap[list.type]}
            </button>
          ))}
        </div>
      {lists
  .filter((list) => list.type === activeListType)
  .map((list) => (
    <div key={list.type} style={{ marginBottom: "2rem" }}>
      <h2>{listTitleMap[list.type]}</h2>

      {list.books.map((book) => (
        <div
          key={book.googleId}
          className="list-item flex p-2 rounded mb-2"
        >
          <div>
            <Link
              to={`/${book.googleId}`}
              
            >
            <strong className="text-m">{book.title}</strong>
            </Link>
            <div className="text-sm">
              {book.authors?.join(", ")}
              <p>number of pages: {book.pageCount}</p>
            </div>
          </div>

          <button
            onClick={async () => {
              await deleteBookFromList(list.type, book.googleId);
              await loadLists();
            }}
            className="list-delete-button"
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

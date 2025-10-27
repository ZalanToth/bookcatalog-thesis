import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8081/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Book details fetched:", data);
          setBook(data);
      })
      .catch(err => console.error("Error fetching book:", err));
  }, [id]);

  if (!book) return <div className="text-white p-6">Loading...</div>;

  const info = book.volumeInfo;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6">
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-48 h-auto rounded-lg shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{info.title}</h1>
          {info.authors && (
            <p className="text-gray-300 mb-2">
              By {info.authors.join(", ")}
            </p>
          )}
          <p className="text-gray-400 mb-4">{info.publishedDate}</p>
          <p className="text-gray-200 leading-relaxed">{info.description}</p>
        </div>
      </div>
    </div>
  );
}
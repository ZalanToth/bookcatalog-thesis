import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToList from "../components/AddToList";
import { submitReview,getReviewsForBook } from "../api/reviewApi";
import type { ReviewDto } from "../api/reviewApi";
import Navbar from "../components/Navbar";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  async function handleSubmitReview() {
    if (!id) {
      setError("Missing book id");
      return;
    }
    try {
    await submitReview({
      googleId:id,
      rating,
      reviewText,
    });
    console.log("Submitting review for book:", id);
    setReviewText("");
    setRating(0);
    setError(null);
    alert("Review saved!");
  } catch (err) {
    setError("Failed to save review");
  }
}

  useEffect(() => {
    if (!id) {
      setError("Missing book id");
      return;
    }
  getReviewsForBook(id).then(setReviews);
  }, [id]);

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


  //Ha meg kell mutatni az oldalt hogy a rating is működik akkor: s1gVAAAAYAAJ // Pride and Prejudice-t kell mutatni mert annak legalább van ratingje
  // ez a postman GET kérés: https://www.googleapis.com/books/v1/volumes/s1gVAAAAYAAJ
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Navbar/>
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6">
        {info.imageLinks?.thumbnail && (
          <img
            src={info.imageLinks.thumbnail}
            alt={info.title}
            className="w-48 h-64 rounded-lg shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{info.title}</h1>
          {info.authors && (
            <p className="text-gray-300 mb-2">
              By {info.authors.join(", ")}
            </p>
          )}
          <p>number of pages: {info.pageCount}</p>
          <p>average rating: {info.averageRating} <sub>from: {info.ratingsCount}</sub></p>
          <p></p>
          <p className="text-gray-400 mb-4">release date: {info.publishedDate}</p>
          <p className="text-gray-200 leading-relaxed">{info.description}</p>
          <AddToList
            googleId={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors ?? []}
            pageCount ={book.volumeInfo.pageCount}
            averageRating={book.volumeInfo.averageRating}
            ratingsCount={book.volumeInfo.ratingsCount}
          />
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Write a review</h2>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 mb-2 block"
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your thoughts..."
              className="border p-2 w-full mb-2"
            />

            {error && <p className="text-red-500">{error}</p>}
            
            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit review
            </button>
          </div>
          <h2 className="text-xl font-semibold mt-6">Reviews</h2>
            {reviews.map((r) => (
              <div key={r.id} className="border p-3 mb-2">
                <div className="font-semibold">
                  {r.userName} – ⭐ {r.rating}
                </div>
                <p>{r.reviewText}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
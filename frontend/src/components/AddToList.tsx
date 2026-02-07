// src/components/AddToList.tsx
import { useState,useEffect } from "react"
import { addBookToList } from "../api/bookListApi"


interface Props {
  googleId: string
  title: string
  authors: string[]
  pageCount: number
  averageRating: number
  ratingsCount: number
}

export default function AddToList({ googleId, title, authors,pageCount,averageRating,ratingsCount }: Props) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [currentList, setCurrentList] = useState<string | null>(null);

  useEffect(() => {
  if (!googleId) return;

  fetch(`http://localhost:8081/api/lists/${googleId}/list-status`, {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => setCurrentList(data.listType))
    .catch(() => setCurrentList(null));
}, [googleId]);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const listType = e.target.value as "TO_READ" | "READING_NOW" | "READ"

    setLoading(true)
    setSuccess(false)

    try {
      await addBookToList(listType, {
        googleId,
        title,
        authors,
        pageCount,
        averageRating,
        ratingsCount
      })
      setSuccess(true)
    } catch {
      alert("Failed to add book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3 mt-4 ">
      <select
        onChange={handleChange}
        disabled={loading}
        value={currentList ?? ""}
        className="border px-3 py-2 rounded"
      >
        <option value="" disabled>
          Add to list…
        </option>
        <option value="TO_READ" className=" text-black">📚 To read</option>
        <option value="READING_NOW" className=" text-black">📖 Reading now</option>
        <option value="READ" className=" text-black">✅ Read</option>
      </select>

      {success && <span className="text-green-600">Saved!</span>}
    </div>
  )
}

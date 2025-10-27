// src/components/BookCard.tsx
import { useNavigate } from "react-router-dom";
interface BookCardProps {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
}

export default function BookCard({ id, title, authors, thumbnail }: BookCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log("Navigálás ide:", `/book/${id}`);
    navigate(`/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex bg-gray-800 text-white rounded-lg p-4 shadow-md cursor-pointer"
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-24 h-32 object-cover rounded-lg mr-4"
        />
      )}
      <div>
        <p>{id}</p>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-300">{authors?.join(", ")}</p>
      </div>
    </div>
  );
}
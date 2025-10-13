// src/components/BookCard.tsx
interface BookCardProps {
  title: string;
  authors?: string[];
  thumbnail?: string;
}

export default function BookCard({ title, authors, thumbnail }: BookCardProps) {
  return (
    <div className="flex bg-gray-800 text-white rounded-lg p-4 shadow-md">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-24 h-32 object-cover rounded-lg mr-4"
        />
      )}
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-300">{authors?.join(", ")}</p>
      </div>
    </div>
  );
}
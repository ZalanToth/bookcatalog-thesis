interface Props {
  book: any;
  onSelect: () => void;
}

export default function SearchResultItem({ book, onSelect }: Props) {
  const info = book.volumeInfo;

  return (
    <div
      onClick={onSelect}
      className="flex gap-3 p-3 hover:bg-gray-700 cursor-pointer"
    >
      {info.imageLinks?.thumbnail && (
        <img
          src={info.imageLinks.thumbnail}
          className="w-10 h-14 object-cover"
        />
      )}

      <div>
        <div className="font-semibold text-white text-sm">
          {info.title}
        </div>
        <div className="text-xs text-gray-400">
          {info.authors?.join(", ")}
        </div>
      </div>
    </div>
  );
}

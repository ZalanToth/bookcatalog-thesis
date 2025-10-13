interface Book {
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
    console.log("BookList kapott könyvek:", books);
  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Könyvek</h1>
      <div className="grid gap-6 max-w-5xl mx-auto">
        {books.map((book, i) => {
          const info = book.volumeInfo;
          const thumbnail =
            info.imageLinks?.thumbnail ||
            info.imageLinks?.smallThumbnail ||
            "https://via.placeholder.com/128x192?text=No+Cover";

          return (
            <div
              key={i}
              className="flex bg-gray-700 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              {/* Borítókép */}
              <img
                src={thumbnail}
                alt={info.title}
                className="w-32 h-48 object-cover"
              />

              {/* Könyv adatok */}
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">{info.title}</h2>
                  {info.authors && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Szerző:</span>{" "}
                      {info.authors.join(", ")}
                    </p>
                  )}
                  {info.publisher && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Kiadó:</span> {info.publisher}
                    </p>
                  )}
                  {info.publishedDate && (
                    <p className="text-gray-300">
                      <span className="font-semibold">Év:</span> {info.publishedDate}
                    </p>
                  )}
                  {info.description && (
                    <p className="text-gray-200 mt-2 line-clamp-4">
                      {info.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

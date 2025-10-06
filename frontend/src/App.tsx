import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<any[]>([]);

  const searchBooks = async () => {
    const res = await fetch(`http://localhost:8080/books/search?query=${query}`);
    const data = await res.json();
    setBooks(data.items || []);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Books kereső</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Keresés..."
      />
      <button onClick={searchBooks}>Keresés</button>

      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <strong>{b.volumeInfo?.title}</strong> — {b.volumeInfo?.authors?.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

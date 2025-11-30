import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Catalogue() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost/bookstore-backend/get_books.php")
      .then(r => r.json())
      .then(setBooks);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="mb-4">Catalogue</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {books.map(b => (
            <div key={b.id} className="card">
              <h3 className="font-semibold mb-2">{b.title}</h3>
              <p className="text-muted mb-1">{b.author}</p>
              <p className="text-muted mb-1">{b.category}</p>
              <p className="mb-2">{b.description?.slice(0, 100)}...</p>
              <div className="font-medium mt-2">₹{b.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

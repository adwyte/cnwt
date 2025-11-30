import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost/bookstore-backend/get_books.php")
      .then(r => r.json())
      .then(data => setBooks(data.slice(0, 4))); // show first 4 only
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4">
        <h1 className="mb-2">Welcome to the Bookstore</h1>
        <p className="mb-6">Find your next read — minimal, clean, enterprise UI.</p>

        <div className="card">
          <h2 className="card-title">Featured Books</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map(b => (
              <div key={b.id} className="card">
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-muted mb-1">{b.author}</p>
                <p className="text-muted mb-2">{b.category}</p>
                <p className="mb-2">{b.description?.slice(0, 70)}...</p>
                <div className="font-medium">₹{b.price}</div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link className="btn" to="/catalogue">Browse Catalogue</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="navbar">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <div className="text-xl font-semibold">Bookstore</div>

        <nav className="flex gap-3 items-center">
          <Link className="btn" to="/">Home</Link>
          <Link className="btn" to="/catalogue">Catalogue</Link>

          {!user && <Link className="btn" to="/login">Login</Link>}
          {!user && <Link className="btn" to="/register">Register</Link>}

          {user && <span className="text-muted">Hi, {user.name}</span>}
          {user && <button className="btn" onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}>Logout</button>}
        </nav>
      </div>
    </div>
  );
}

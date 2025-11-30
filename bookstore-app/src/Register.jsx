import { useState } from "react";
import Navbar from "./Navbar";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost/bookstore-backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("Backend:", data);

      if (data.status === "ok") {
        alert("Registered successfully! Please log in.");
        window.location.href = "/login";
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4">
        <h1 className="mb-4">Register</h1>

        <div className="card">
          <label>Name</label>
          <input 
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <label>Email</label>
          <input 
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <label>Password</label>
          <input 
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <button className="btn mt-4" onClick={submit}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Navbar from "./Navbar";

export default function Login(){
  const [form,setForm] = useState({email:"",password:""});

  const submit = async () => {
    const res = await fetch("http://localhost/bookstore-backend/login.php", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.status === "ok") {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/catalogue";
    } else {
      alert(data.error || "Invalid");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="px-6 py-8 flex justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-2">Login</h1>
          <div className="card">
            <label>Email</label>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <label className="mt-3">Password</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
            <div className="mt-4">
              <button className="btn" onClick={submit}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

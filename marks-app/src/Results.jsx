import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Results() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost/marks-backend/get_all_results.php")
      .then(res => res.json())
      .then(data => setRows(data));
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />

      <div className="flex flex-col items-center px-6 py-6">

        <div className="w-full max-w-5xl mb-10">
          <h1 className="text-3xl font-semibold">All Students – Results</h1>
          <p className="text-muted mt-1">Fetched from Database</p>
        </div>

        {rows.map(stu => (
          <div key={stu.id} className="card w-full max-w-5xl">

            <h2>{stu.name} ({stu.roll})</h2>

            <p className="text-muted mb-4">
              Total: {stu.total} | Average: {stu.average}
            </p>

            {stu.subjects.map(s => (
              <div key={s.id} className="mb-2">
                <strong>{s.subject}</strong> → 
                MSE {s.mse},  
                ESE {s.ese},  
                Final {s.final}
              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}

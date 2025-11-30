import { useState } from "react";
import Navbar from "./Navbar";

export default function App() {
  const subjects = ["DAA", "CC", "ML", "CNT"];

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    roll: ""
  });

  const [marks, setMarks] = useState({
    DAA: { mse: "", ese: "" },
    CC: { mse: "", ese: "" },
    ML: { mse: "", ese: "" },
    CNT: { mse: "", ese: "" },
  });

  const handleChange = (subj, field, value) => {
    setMarks(prev => ({
      ...prev,
      [subj]: { ...prev[subj], [field]: value },
    }));
  };

  const calcFinal = (m, e) => {
    const mse = parseFloat(m);
    const ese = parseFloat(e);
    if (isNaN(mse) || isNaN(ese)) return "-";
    return (mse * 0.3 + ese * 0.7).toFixed(2);
  };

  const handleSubmit = async () => {
    const payload = {
      name: studentInfo.name,
      roll: studentInfo.roll,
      marks: subjects.map(subj => ({
        subject: subj,
        mse: parseFloat(marks[subj].mse),
        ese: parseFloat(marks[subj].ese)
      }))
    };

    try {
      const res = await fetch("http://localhost/marks-backend/save_marks.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Server Response:", data);
      alert("Saved! Student ID = " + data.student_id);

    } catch (err) {
      console.error("Error:", err);
      alert("Error saving data.");
    }
  };


  return (
    <div className="min-h-screen w-full bg-background text-foreground">

      <Navbar />

      <div className="flex flex-col items-center px-6 py-6">

        <div className="w-full max-w-5xl mb-10">
          <h1 className="text-3xl font-semibold text-foreground">Course Marks Entry (Final Calculation)</h1>
          <p className="text-muted mt-1">
            Enter student info and marks for all subjects.
          </p>
        </div>

        {/* Student Info Card */}
        <div className="w-full max-w-5xl card mb-8">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>

          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter student name"
              value={studentInfo.name}
              onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label>Roll Number</label>
            <input
              type="text"
              placeholder="Enter roll number"
              value={studentInfo.roll}
              onChange={(e) => setStudentInfo({ ...studentInfo, roll: e.target.value })}
            />
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

          {subjects.map((subj) => (
            <div key={subj} className="card bg-card border border-border">

              <h2 className="text-xl font-semibold mb-4 text-foreground">{subj}</h2>

              <div className="mb-4">
                <label>MSE Marks (30%)</label>
                <input
                  type="number"
                  value={marks[subj].mse}
                  onChange={(e) => handleChange(subj, "mse", e.target.value)}
                  placeholder="Enter MSE marks"
                />
              </div>

              <div className="mb-4">
                <label>ESE Marks (70%)</label>
                <input
                  type="number"
                  value={marks[subj].ese}
                  onChange={(e) => handleChange(subj, "ese", e.target.value)}
                  placeholder="Enter ESE marks"
                />
              </div>

              <div className="mt-4 p-3 rounded-lg border border-border bg-hover">
                <span className="font-medium">Final Marks: </span>
                {calcFinal(marks[subj].mse, marks[subj].ese)}
              </div>

            </div>
          ))}

        </div>

        <button className="btn mt-8" onClick={handleSubmit}>
          Save to Database
        </button>

      </div>
    </div>
  );
}

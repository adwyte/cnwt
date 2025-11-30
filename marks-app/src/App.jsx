import { useState } from "react";

export default function App() {
  const subjects = ["DAA", "CC", "ML", "CNT"];

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-6 py-12 bg-background text-foreground">
      
      {/* Page Title */}
      <div className="w-full max-w-5xl mb-10">
        <h1 className="text-3xl font-semibold text-foreground">Course Marks Entry (Final Calculation)</h1>
        <p className="text-muted mt-1">
          Enter MSE (30%) and ESE (70%) marks for all subjects.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

        {subjects.map((subj) => (
          <div key={subj} className="card bg-card border border-border">

            <h2 className="text-xl font-semibold mb-4 text-foreground">{subj}</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-foreground">MSE Marks (30%)</label>
              <input
                type="number"
                value={marks[subj].mse}
                onChange={(e) => handleChange(subj, "mse", e.target.value)}
                className="text-foreground border-input"
                placeholder="Enter MSE marks"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-foreground">ESE Marks (70%)</label>
              <input
                type="number"
                value={marks[subj].ese}
                onChange={(e) => handleChange(subj, "ese", e.target.value)}
                className="text-foreground border-input"
                placeholder="Enter ESE marks"
              />
            </div>

            {/* Final Marks Box */}
            <div 
              className="mt-4 p-3 rounded-lg border border-border bg-hover"
            >
              <span className="font-medium">Final Marks: </span>
              {calcFinal(marks[subj].mse, marks[subj].ese)}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

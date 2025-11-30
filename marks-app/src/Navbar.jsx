export default function Navbar() {
  return (
    <div className="w-full border-b border-border bg-card mb-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-2">

        <h1 className="text-xl font-semibold tracking-tight">
          VIERP Marks Portal
        </h1>

        <nav className="flex gap-4">
          <a href="/" className="btn px-4 py-2">Marks Entry</a>
          <a href="/results" className="btn px-4 py-2">View Results</a>
        </nav>

      </div>
    </div>
  );
}

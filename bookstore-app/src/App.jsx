import Navbar from "./Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="px-6 py-8 flex justify-center">
        <div className="max-w-5xl w-full">Main area</div>
      </div>
    </div>
  );
}

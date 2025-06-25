"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-200 font-medium"
          onClick={goHome}
        >
          <Home size={18} />
          Go Home
        </button>
      </div>
    </div>
  );
}

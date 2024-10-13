"use client";

import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <button
        className="bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent flex items-center transition-colors duration-300 ease-in-out"
        onClick={goHome}
      >
        <FaHome className="mr-2" />
        Go Home
      </button>
    </div>
  );
}

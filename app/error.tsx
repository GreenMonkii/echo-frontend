"use client";

import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-xl mb-8">An unexpected error has occurred.</p>
      <button
        className="bg-primary text-secondary px-6 py-3 rounded-lg shadow-md hover:bg-accent flex items-center"
        onClick={goHome}
      >
        <FaHome className="mr-2" />
        Go Home
      </button>
    </div>
  );
}

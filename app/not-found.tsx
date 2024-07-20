"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-96 sm:h-60 w-dvw flex flex-col items-center justify-center">
      <p>This Page is Not Found</p>
      <button
        className="underline font-bold"
        onClick={() => router.push("/", { scroll: false })}
      >
        Go home
      </button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Optional: or use any icon library
import { Button } from "@/components/ui/button";

type BackButtonProps = {
  label?: string;
  className?: string;
};

const BackButton = ({ label = "Back", className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={`flex mb-4 items-center gap-2 text-sm font-medium ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
};

export default BackButton;

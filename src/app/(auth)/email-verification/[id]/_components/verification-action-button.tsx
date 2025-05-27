"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const VerificationActionButton = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  return (
    <Button asChild variant="outline" className="w-full">
      <Link href={callback ? `/login?callback=${callback}` : "/login"}>
        Login Now
      </Link>
    </Button>
  );
};

export default VerificationActionButton;

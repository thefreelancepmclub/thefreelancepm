"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ConfirmationRedirectButton = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  return (
    <Link
      href={callback ? `/login?callback=${callback}` : "/login"}
      className="text-blue-600 hover:underline"
    >
      Log in
    </Link>
  );
};

export default ConfirmationRedirectButton;

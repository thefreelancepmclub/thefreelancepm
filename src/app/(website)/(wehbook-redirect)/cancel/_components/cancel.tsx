import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";

interface SuccessMessageProps {
  title: string;
  highlightedWord?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CanceledPage({
  highlightedWord = "received",
  description = "Thank you for your payment. Your plan has been upgraded! Please check your email for a payment confirmation & invoice.",
  buttonText = "Home",
  buttonHref = "/",
}: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto p-6 text-center">
      <div className="bg-rose-100 rounded-full p-4 mb-6">
        <CircleX className="h-8 w-8 text-red-500" />
      </div>

      <h2 className="text-xl font-medium text-blue-900 mb-3">
        Oops! Your Payment Wasn’t{" "}
        <span className="text-amber-500 font-medium">{highlightedWord}</span>
      </h2>

      {description && (
        <p className="text-sm text-gray-600 mb-6">{description}</p>
      )}

      {buttonText && (
        <Link href={buttonHref}>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8">
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}

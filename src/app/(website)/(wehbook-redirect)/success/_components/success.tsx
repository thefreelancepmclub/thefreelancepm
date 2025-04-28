import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface SuccessMessageProps {
  title: string;
  highlightedWord?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function SuccessMessage({
  title = "Your payment has been received!",
  highlightedWord = "received",
  description = "Thank you for your payment. Your plan has been upgraded! Please check your email for a payment confirmation & invoice.",
  buttonText = "Home",
  buttonHref = "/",
}: SuccessMessageProps) {
  // Split the title to highlight the specified word
  const titleParts = title.split(highlightedWord);

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 text-center">
      <div className="bg-green-100 rounded-full p-4 mb-6">
        <Check className="h-8 w-8 text-green-500" />
      </div>

      <h2 className="text-xl font-medium text-blue-900 mb-3">
        {titleParts[0]}
        <span className="text-amber-500 font-medium">{highlightedWord}</span>
        {titleParts[1]}
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

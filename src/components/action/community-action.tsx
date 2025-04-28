import { Button } from "@/components/ui/button";

export default function CommunityAction() {
  return (
    <div className="w-full bg-brand text-white rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Ready to <span className="text-yellow-300">Transform</span> Your PM
        Career?
      </h2>
      <p className="mb-6 max-w-2xl mx-auto">
        Join our community today and get instant access to resources that will
        help you excel as a freelance project manager.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Get Started
        </Button>
        <Button variant="outline" effect="gooeyLeft" className="bg-transparent">
          Explore
        </Button>
      </div>
    </div>
  );
}

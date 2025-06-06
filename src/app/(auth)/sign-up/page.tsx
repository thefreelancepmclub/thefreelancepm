import Image from "next/image";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:w-3/5 md:w-1/2 bg-gray-900 lg:block relative">
        <Image
          src="https://res.cloudinary.com/drdztqgcx/image/upload/v1745573218/Rectangle_4833_guur5l.png"
          alt="Team meeting"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Sign up form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Create account text */}
          <div className="text-center">
            <h1 className="text-[32px] leading-[120%]  font-semibold text-gray-900">
              Create Your{" "}
              <span className="text-orange-500 underline">Account</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join us and start shopping today
            </p>
          </div>

          {/* Sign up form component */}
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

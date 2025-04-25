"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0  left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>

        <Image src="/Logo.png" width={40} height={100} alt="logo" />

        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
          Join Now
        </Button>
      </div>
    </header>
  );
}

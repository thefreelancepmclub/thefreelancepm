"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navlinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Subscription",
    href: "/subscription",
  },
  {
    id: 3,
    label: "Job Board",
    href: "/job",
  },
  {
    id: 4,
    label: "Templates",
    href: "/templates",
  },
  {
    id: 5,
    label: "Courses",
    href: "/courses",
  },
  {
    id: 6,
    label: "Quizzes",
    href: "/quizzes",
  },
  {
    id: 7,
    label: "Testimonial",
    href: "/testmonial",
  },
  {
    id: 8,
    label: "Coaching",
    href: "/coaching",
  },
  {
    id: 9,
    label: "Faq",
    href: "/faq",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="space-y-4 mt-10">
              {navlinks.map(({ id, href, label }) => (
                <Button
                  variant="link"
                  effect="hoverUnderline"
                  asChild
                  key={id}
                  className="text-black"
                >
                  <Link href={href} className="w-full">
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Image src="/Logo.png" width={40} height={100} alt="logo" />

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
          asChild
        >
          <Link href="/sign-up">Join Now</Link>
        </Button>
      </div>
    </header>
  );
}

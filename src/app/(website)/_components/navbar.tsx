"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Role } from "@prisma/client";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  faHouse,
  faLayerGroup,
  faClipboard,
  faCopy,
  faFilePen,
  faPeopleArrows,
  faMessage,
  faQuestion
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const navlinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: faHouse
  },
  {
    id: 2,
    label: "Subscriptions",
    href: "/subscriptions",
    icon: faLayerGroup
  },
  {
    id: 3,
    label: "Job Board",
    href: "/jobBoard",
    icon: faClipboard
  },
  {
    id: 4,
    label: "Templates",
    href: "/templates",
    icon: faCopy
  },
  {
    id: 5,
    label: "Courses",
    href: "/courses",
    icon: faMessage
  },
  {
    id: 6,
    label: "Quizzes",
    href: "/quizzes",
    icon: faFilePen,

  },
  {
    id: 7,
    label: "Testimonials",
    href: "/testmonial",
    icon: faPeopleArrows,
  },
  {
    id: 8,
    label: "Coaching",
    href: "/coaching",
    icon: faMessage
  },
  {
    id: 9,
    label: "FAQs",
    href: "/faq",
    icon: faQuestion
  },
];

interface Props {
  isLoggedin: boolean;
  role: Role;
  isJobBoardVisible: boolean;
}

export default function Navbar({ isLoggedin, role, isJobBoardVisible }: Props) {
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

  const formattedNavlinks = isJobBoardVisible
    ? navlinks
    : navlinks.filter((item) => item.id !== 3);

  return (
    <header
      className={`fixed top-0  left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4"
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
            <div className="mt-10">
              {formattedNavlinks.map(({ id, href, label, icon }) => (
                <div key={id} className="flex items-center mb-3"> 
                  <FontAwesomeIcon icon={icon} className="text-gray-600" /> 
                  <Button
                    variant="link"
                    effect="hoverUnderline"
                    asChild
                    className="text-black p-0 hover:no-underline"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={href} className="w-full text-left">
                      {label}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <Image src="/Logo.png" width={40} height={100} alt="logo" />
        </Link>

        {isLoggedin ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full">
                  <User className="text-orange-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  {role === "admin" ? (
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/account" className="w-full">
                      Account{" "}
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ redirectTo: "/", redirect: true });
                  }}
                  className="cursor-pointer w-full"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors w-24" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors w-24" asChild>
              <Link href="/sign-up">Join Now</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

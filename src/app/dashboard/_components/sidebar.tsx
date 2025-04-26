"use client";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  Video,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SIdebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        <div className="border-b p-6 flex justify-center items-center">
          <div className="relative h-[80px] w-[80px]">
            <Image src="/Logo.png" alt="logo" fill />
          </div>
        </div>
        <nav className="flex-1 overflow-auto p-3">
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md bg-primary px-3 py-2 text-primary-foreground"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <FileText className="h-5 w-5" />
                <span>Content</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Job Board</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Video className="h-5 w-5" />
                <span>Coaching</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronDown className="h-5 w-5" />
                <span>Subscription</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t p-3">
          <Button
            variant="destructive"
            className="w-full justify-start gap-3"
            onClick={async () => {
              await signOut({ redirectTo: "/" });
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SIdebar;

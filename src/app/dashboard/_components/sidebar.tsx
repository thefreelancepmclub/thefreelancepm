"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  DollarSign,
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
import { usePathname } from "next/navigation";

const routes = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: 2,
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    id: 3,
    label: "Content",
    icon: FileText,
    href: "/dashboard/content",
  },
  {
    id: 4,
    label: "Job Board",
    icon: ShoppingBag,
    href: "/dashboard/job-board",
  },
  {
    id: 5,
    label: "Coaching",
    icon: Video,
    href: "/dashboard/coaching",
  },
  {
    id: 6,
    label: "Subscription",
    icon: DollarSign,
    href: "/dashboard/subscription",
  },
  {
    id: 7,
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    id: 8,
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b p-6 flex justify-center items-center">
          <div className="relative h-[80px] w-[80px]">
            <Image src="/Logo.png" alt="logo" fill />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-auto p-3">
          <ul className="space-y-2">
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive =
                route.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(route.href);

              return (
                <li key={route.id}>
                  <Link
                    href={route.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2
          ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{route.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
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

export default Sidebar;

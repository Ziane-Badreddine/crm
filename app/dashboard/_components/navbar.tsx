"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {  Home, LogOut, Menu, Plus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLInks = [
  {
    label: "dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "clients",
    href: "/dashboard/clients",
    icon: Users,
  },
];

export default function Navbar() {
  const pathmane = usePathname();
  return (
    <header className=" sticky top-0 left-0 px-6 z-10 w-full py-4 md:px-10 border-b border-primary backdrop-blur-xl  shadow-lg flex items-center justify-between">
      <Link className="flex items-center gap-3" href={"/dashboard"}>
        <Users className="text-primary" size={30} />
        <h1 className="text-3xl">CRM</h1>
      </Link>
      <div className=" hidden md:flex items-center justify-center gap-5 h-10">
        <nav className="flex items-center justify-center gap-5 capitalize">
          {navLInks.map((link, i) => {
            return (
              <Link
                className={cn(
                  "hover:text-primary  transition-all duration-300",
                  pathmane === link.href && "text-primary"
                )}
                key={i}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Separator orientation="vertical" />
        <Link href={"/dashboard/clients/add"}>
          <Button>
            <Plus />
            Add client
          </Button>
        </Link>
        <Separator orientation="vertical" />
        <Link href={"/login"}>
          <Button variant={"outline"}>
            <LogOut />
            Log out
          </Button>
        </Link>
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu size={30} />
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>
                <Link className="flex items-center gap-2" href={"/dashboard"}>
                  <Users className="text-primary" size={30} />
                  <h1 className="text-2xl">CRM</h1>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="w-full grid gap-5 p-5">
              {navLInks.map((link, i) => {
                return (
                  <div key={i} className="grid gap-5 w-full">
                    <Link
                      className={cn(
                        "hover:text-primary flex gap-2 items-start justify-start  transition-all duration-300",
                        pathmane === link.href && "text-primary"
                      )}
                      href={link.href}
                    >
                      <link.icon />
                      {link.label}
                    </Link>
                    <Separator className="bg-muted-foreground" />
                  </div>
                );
              })}
              <Link href={"/dashboard/clients/add"}>
                <Button className="w-full rounded-none">
                  <Plus />
                  Add client
                </Button>
              </Link>
              <Link href={"/login"}>
                <Button variant={"outline"} className="w-full rounded-none">
                  <LogOut />
                  Log out
                </Button>
              </Link>
              <div className="bg-muted-foreground/10 p-5 flex items-center justify-between">
                <h1>Appearance</h1>
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

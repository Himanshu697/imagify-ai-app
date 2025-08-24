import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Sparkles } from "lucide-react";
import * as React from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/result", label: "Results" },
  { to: "/buy", label: "Buy Credits" },
];

function DesktopNav() {
  return (
    <div className="hidden md:flex items-center gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-3 py-2 rounded-xl text-sm font-medium transition
             ${isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted hover:text-foreground"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">Imagefy</span>
        </div>
        <Separator className="my-4" />
        <nav className="grid gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-base transition
                 ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-2 flex gap-2">
            <Link to="/signup" className="w-full">
              <Button className="w-full" variant="default">Sign up</Button>
            </Link>
            <Link to="/checkout" className="w-full">
              <Button className="w-full" variant="outline">Checkout</Button>
            </Link>
          </div>
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold">Imagefy</span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/signup">
              <Button variant="outline">Sign up</Button>
            </Link>
            <Link to="/checkout">
              <Button>Checkout</Button>
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

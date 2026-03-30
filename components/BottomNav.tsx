"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <Link className={pathname === "/" ? "nav-item active" : "nav-item"} href="/">
        Home
      </Link>
      <Link className={pathname === "/about" ? "nav-item active" : "nav-item"} href="/about">
        About
      </Link>
    </nav>
  );
}

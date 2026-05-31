"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("on", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" ref={navRef}>
      <Link href="/" className="n-logo">ARUN</Link>
      <div className="n-links">
        <Link href="/projects" className="n-link">Work</Link>
        <a href="mailto:aruntheja0212@gmail.com" className="n-link">Contact</a>
      </div>
    </nav>
  );
}

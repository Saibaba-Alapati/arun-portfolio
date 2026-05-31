"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById("cur");
    if (!cur) return;

    const onMove = (e: MouseEvent) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);

    const addBig = () => cur.classList.add("big");
    const rmBig = () => cur.classList.remove("big");

    const bindHover = () => {
      document.querySelectorAll("a, button, .blf, .fwc, .pcard").forEach((el) => {
        el.addEventListener("mouseenter", addBig);
        el.addEventListener("mouseleave", rmBig);
      });
    };
    bindHover();

    // Re-bind after any DOM change (Next.js page nav)
    const mo = new MutationObserver(bindHover);
    mo.observe(document.body, { childList: true, subtree: true });

    // Amber cursor on s6 section
    const s6 = document.getElementById("s6");
    let io6: IntersectionObserver | undefined;
    if (s6) {
      io6 = new IntersectionObserver(
        ([e]) => cur.classList.toggle("amber", e.isIntersecting),
        { threshold: 0.1 }
      );
      io6.observe(s6);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      mo.disconnect();
      io6?.disconnect();
    };
  }, []);

  return <div className="cur" id="cur" />;
}

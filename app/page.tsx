"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./home.css";
import Link from "next/link"

export default function Home() {

const pathname = usePathname();
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  setLoaded(false);

  const timer = setTimeout(() => {
    setLoaded(true);
  }, 50);

  return () => clearTimeout(timer);
}, [pathname]);

  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <main
      className={`home ${
        hoverSide === "left"
          ? "hover-left"
          : hoverSide === "right"
          ? "hover-right"
          : ""
      }`}
    >
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <span className="logo">SKINSTRIC</span>
          <span className="intro">[ INTRO ]</span>
        </div>

        <div className="nav-right">
          <button className="enter-code">ENTER CODE</button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <h1 className={`hero-title ${loaded ? "animate" : ""}`}>
            <span className="line line-1">Sophisticated</span>
            <span className="line line-2">skincare</span>
          </h1>
        </div>
      </div>

      {/* LEFT SIDE */}
      <div
        className="side-left"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <div className="diamond">
          <div className="diamond-inner-left">▶</div>
        </div>
        <span>DISCOVER A.I.</span>
      </div>

      {/* RIGHT SIDE */}
        <Link
          href="/testing"
          className="side-right"
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <span>TAKE TEST</span>
          <div className="diamond">
            <div className="diamond-inner">▶</div>
          </div>
        </Link>

      {/* DESCRIPTION */}
      <div className="description">
        Skinstric developed an A.I. that creates a highly-personalized
        routine tailored to what your skin needs.
      </div>

      {/* TRIANGLES */}
      <div className="tri-left">
        <div className="line tl"></div>
        <div className="line bl"></div>
      </div>

      <div className="tri-right">
        <div className="line tr"></div>
        <div className="line br"></div>
      </div>
    </main>
  );
}





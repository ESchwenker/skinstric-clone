"use client";

import Link from "next/link";
import "./select.css";
import { useEffect, useState } from "react";

export default function SelectPage() {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysis");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!analysis) return null;

  return (
    <main className="select-page">
      <div className="navbar">
        <div className="nav-left">
          <span className="logo">SKINSTRIC</span>
          <span className="intro">[ INTRO ]</span>
        </div>

        <div className="nav-left-bottom">
          <span className="analysis">A.I. ANALYSIS</span>
          <span className="estimation">
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </span>
        </div>

        <div className="nav-right">
          <button className="enter-code">ENTER CODE</button>
        </div>
      </div>

      <div className="diamond-section">
        {/* outer dotted diamond */}
        <div className="outer-diamond"></div>

        {/* diamonds */}

        <div className="diamond top">
          <span className="diamond-text">DEMOGRAPHICS</span>
        </div>

        <div className="diamond left">
          <span className="diamond-text">
            COSMETIC <br /> CONCERNS
          </span>
        </div>

        <div className="diamond right">
          <span className="diamond-text">SKIN TYPE DETAILS</span>
        </div>

        <div className="diamond bottom">
          <span className="diamond-text">WEATHER</span>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}

      <Link href="/analysis/loading" className="loading-back-button">
        <div className="loading-diamond">
          <div className="loading-diamond-inner-left">◀</div>
        </div>
        <span>BACK</span>
      </Link>

      <Link href="/analysis/summary" className="summary-button">
        <span>GET SUMMARY</span>
        <div className="summary-diamond">
          <div className="loading-diamond-inner-right">▶</div>
        </div>
      </Link>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./loading.css";

export default function LoadingPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const image = sessionStorage.getItem("uploadedImage");
    if (image) setPreview(image);

    const runAnalysis = async () => {
      if (!image) {
        router.push("/results");
        return;
      }

      try {
        const res = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
          }
        );

        const data = await res.json();
        sessionStorage.setItem("analysis", JSON.stringify(data));

        router.push("/analysis/select");
      } catch (err) {
        console.error(err);
      }
    };

    runAnalysis();
  }, [router]);

  return (
    <main className="loading-page">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <span className="logo">SKINSTRIC</span>
          <span className="intro">[ INTRO ]</span>
        </div>

        <div className="nav-left-bottom">
          <span className="analysis">TO START ANALYSIS</span>
        </div>

        <div className="nav-right">
          <button className="enter-code">ENTER CODE</button>
        </div>
      </div>

      {/* CENTER LOADING */}
        <div className="loading-center">

        <div className="loading-square-container">
            <div className="loading-square loading-square-1"></div>
            <div className="loading-square loading-square-2"></div>
            <div className="loading-square loading-square-3"></div>
        </div>

        <h2>PREPARING YOUR ANALYSIS...</h2>

        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>

        </div>
    </main>
  );
}
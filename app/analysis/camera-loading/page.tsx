"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./camera-loading.css";

export default function CameraLoading() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });

    const timer = setTimeout(() => {
      router.push("/analysis/camera");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!mounted) return null;

  return (
    <main className="camera-loading-page">
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

      {/* CENTER CONTENT */}
      <div className="loading-center">
        <div className="load-diamond-wrapper">
          <div className="load-diamond-container">
            <div className="load-diamond load-diamond-1"></div>
            <div className="load-diamond load-diamond-2"></div>
            <div className="load-diamond load-diamond-3"></div>
          </div>

          <div className="loading-circle">
            <div className="analysis-circle">
              <Image
                src="/ellipse.png"
                alt="outer circle"
                width={160}
                height={160}
                className="outer-circle"
              />

              <Image
                src="/shutter.png"
                alt="shutter icon"
                width={120}
                height={120}
                className="inner-icon shutter-icon"
              />
            </div>
          </div>
        </div>

        <p className="loading-text">SETTING UP CAMERA ...</p>

        <div className="loading-tips">
          <p className="tips-title">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>

          <div className="tips-list">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import "./results.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const [showPermission, setShowPermission] = useState(false);

  const allowCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      setShowPermission(false);

      router.push("/analysis/camera-loading");
    } catch (err) {
      console.error("Camera permission denied");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file selected");

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      sessionStorage.setItem("uploadedImage", reader.result as string);

      router.push("/analysis/loading");
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      {showPermission && (
        <div className="permission-overlay">
          <div className="permission-modal">
            <h2>ALLOW A.I. TO ACCESS YOUR CAMERA</h2>

            <div className="permission-buttons">
              <button
                className="deny-button"
                onClick={() => setShowPermission(false)}
              >
                DENY
              </button>

              <button
                className="allow-button"
                onClick={() => window.location.href = "/analysis/camera-loading"}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="results-page">
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

        {/* MAIN CONTENT */}
        <div className="analysis-container">
          {/* CAMERA OPTION (left) */}
          <div
            className="analysis-option left"
            onClick={() => setShowPermission(true)}
          >
            <div className="analysis-square">
              <div className="square-layer results-layer-1"></div>
              <div className="square-layer results-layer-2"></div>
              <div className="square-layer results-layer-3"></div>

              <div className="analysis-circle">
                <Image
                  src="/ellipse.png"
                  alt="outer circle"
                  fill
                  className="outer-circle"
                />

                <Image
                  src="/shutter.png"
                  alt="shutter icon"
                  fill
                  className="inner-icon shutter-icon"
                />
              </div>
            </div>

            <div className="connector">
              <span className="dot"></span>
            </div>

            <div className="analysis-text">
              ALLOW A.I.
              <br />
              TO SCAN YOUR FACE
            </div>
          </div>

          {/* GALLERY OPTION (right) */}
          <label className="analysis-option right">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <div className="analysis-square">
              <div className="square-layer results-layer-1"></div>
              <div className="square-layer results-layer-2"></div>
              <div className="square-layer results-layer-3"></div>

              <div className="analysis-circle">
                <Image
                  src="/ellipse.png"
                  alt="outer circle"
                  fill
                  className="outer-circle"
                />

                <Image
                  src="/gallery.png"
                  alt="gallery icon"
                  fill
                  className="inner-icon"
                />
              </div>
            </div>

            <div className="connector">
              <span className="dot"></span>
            </div>

            <div className="analysis-text">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </div>
          </label>
        </div>

        {/* BACK BUTTON */}
        <Link href="/testing" className="back-button">
          <div className="diamond">
            <div className="diamond-inner-left">▶</div>
          </div>
          <span>BACK</span>
        </Link>
      </main>
    </>
  );
}

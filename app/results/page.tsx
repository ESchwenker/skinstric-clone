"use client";

import Link from "next/link";
import "./results.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();

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
        <div className="analysis-option left">
          <div className="analysis-square">
            <div className="square-layer results-layer-1"></div>
            <div className="square-layer results-layer-2"></div>
            <div className="square-layer results-layer-3"></div>

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
                width={130}
                height={130}
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
                width={160}
                height={160}
                className="outer-circle"
              />

              <Image
                src="/gallery.png"
                alt="gallery icon"
                width={135}
                height={135}
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
  );
}

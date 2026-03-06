"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./camera.css";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };

    startCamera();
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");

    setPhoto(image);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const usePhoto = () => {
    if (!photo) return;

    sessionStorage.setItem("capturedPhoto", photo);

    router.push("/analysis/select");
  };

  return (
    <main className="camera-page">
      {/* NAVBAR */}
      <div className="navbar-camera">
        <div className="nav-left">
          <span className="logo">SKINSTRIC</span>
          <span className="intro">[ INTRO ]</span>
        </div>

        <div className="nav-right">
          <button className="enter-code">ENTER CODE</button>
        </div>
      </div>

      {/* VIDEO (ALWAYS MOUNTED) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`camera-feed ${photo ? "hidden" : ""}`}
      />

      {/* PREVIEW IMAGE */}
      {photo && <img src={photo} className="preview-image" />}

      {/* CAMERA MODE UI */}
      {!photo && (
        <>
          <div className="camera-guide">
            <p className="tips-title">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>

            <div className="tips-list">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>
          </div>

          <div className="capture-ui" onClick={takePhoto}>
            <span className="capture-text">TAKE PICTURE</span>

            <div className="capture-button">
              <div className="camera-icon">
                <Image
                  src="/camera.png"
                  alt="take picture"
                  width={38}
                  height={34}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* PREVIEW MODE UI */}
      {photo && (
        <div className="preview-overlay">
          <h2 className="great-shot">LOOKING GOOD!</h2>

          <h3 className="preview-title">Preview</h3>

          <div className="preview-buttons">
            <button className="retake" onClick={retakePhoto}>
              Retake
            </button>

            <button className="use-photo" onClick={usePhoto}>
              Use This Photo
            </button>
          </div>
        </div>
      )}

      {/* hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* BACK BUTTON */}
        <a href="/results" className="camera-back-button">
        <div className="camera-diamond">
            <div className="camera-diamond-inner-left">▶</div>
        </div>
        <span>BACK</span>
        </a>
    </main>
  );
}

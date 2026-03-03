"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./testing.css";
import { useRouter } from "next/navigation";

export default function Testing() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const [step, setStep] = useState<"name" | "city" | "processing" | "complete">(
    "name",
  );
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async () => {
    if (step === "name") {
      if (!name.trim()) return;
      setStep("city");
      return;
    }

    if (step === "city") {
      if (!city.trim()) return;

      setStep("processing");

      try {
        await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              city,
            }),
          },
        );
      } catch (err) {
        console.error("API error:", err);
      }

      setTimeout(() => {
        setStep("complete");
      }, 1500);
    }
  };

  const currentValue = step === "name" ? name : city;
  const setCurrentValue = step === "name" ? setName : setCity;

  const currentPlaceholder =
    step === "name" ? "Introduce Yourself" : "Your City Name";

  return (
    <main className={`testing ${animate ? "animate-in" : ""}`}>
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

      {/* CENTER CONTENT */}
      <div className="testing-center">
        {/* NAME + CITY INPUT */}
        {(step === "name" || step === "city") && (
          <>
            <p className="click-label">CLICK TO TYPE</p>

            <div className="input-wrapper">
              <input
                className="testing-input"
                autoFocus
                placeholder={
                  step === "name" ? "Introduce Yourself" : "Your City Name"
                }
                value={step === "name" ? name : city}
                onChange={(e) =>
                  step === "name"
                    ? setName(e.target.value)
                    : setCity(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
          </>
        )}

        {/* PROCESSING SCREEN */}
        {step === "processing" && (
          <div className="processing-screen">
            <h2>Processing submission</h2>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* COMPLETE SCREEN */}
        {step === "complete" && (
          <div className="complete-screen">
            <h1>Thank you!</h1>
            <p>Proceed for the next step</p>
          </div>
        )}
      </div>

      {/* BACK BUTTON */}
      <Link href="/" className="back-button">
        <div className="diamond">
          <div className="diamond-inner-left">▶</div>
        </div>
        <span>BACK</span>
      </Link>

      {/* Animated Background Layers */}
      <div className="layer-1"></div>
      <div className="layer-2"></div>
      <div className="layer-3"></div>

      {step === "complete" && (
        <div className="proceed-button" onClick={() => router.push("/results")}>
          <span>PROCEED</span>
          <div className="diamond proceed-diamond">
            <div className="diamond-inner-right">▶</div>
          </div>
        </div>
      )}
    </main>
  );
}

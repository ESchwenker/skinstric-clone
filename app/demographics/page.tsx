"use client";

import { useEffect, useState } from "react";
import "./demographics.css";
import Link from "next/link";

export default function DemographicsPage() {
  const [data, setData] = useState<any>(null);
  const [activeCard, setActiveCard] = useState("race");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const image =
          sessionStorage.getItem("capturedPhoto") ||
          sessionStorage.getItem("uploadedImage");

        if (!image) {
          console.error("No image found in sessionStorage");
          return;
        }

        const res = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: image.split(",")[1],
            }),
          },
        );

        const result = await res.json();

        console.log("API RESULT:", result);

        const { race, age, gender } = result.data;

        const getTopPrediction = (obj: any) => {
          return Object.entries(obj).sort((a: any, b: any) => b[1] - a[1])[0];
        };

        const [topRace, raceConfidence] = getTopPrediction(race);
        const [topAge, ageConfidence] = getTopPrediction(age);
        const [topGender, genderConfidence] = getTopPrediction(gender);

        setData({
          race: topRace,
          age: topAge,
          gender: topGender,

          confidence: Math.round(raceConfidence * 100),
          ageConfidence: Math.round(ageConfidence * 100),
          genderConfidence: Math.round(genderConfidence * 100),

          racePredictions: race,
          agePredictions: age,
          genderPredictions: gender,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchResults();
  }, []);

  if (!data) {
    return (
      <main className="demographics-page loading-screen">
        <div className="loader-container">
          <div className="loader-ring"></div>
          <p className="loader-text">Analyzing demographics...</p>
        </div>
      </main>
    );
  }

  let predictions: any = {};

  if (activeCard === "race") {
    predictions = data.racePredictions;
  }

  if (activeCard === "age") {
    predictions = data.agePredictions;
  }

  if (activeCard === "sex") {
    predictions = data.genderPredictions;
  }

  let centerTitle = "";
  let centerValue = 0;

  if (selectedLabel) {
    centerTitle = selectedLabel;
    centerValue = Math.round(predictions[selectedLabel] * 100);
  } else {
    if (activeCard === "race") {
      centerTitle = data.race;
      centerValue = data.confidence;
    }

    if (activeCard === "age") {
      centerTitle = data.age;
      centerValue = data.ageConfidence;
    }

    if (activeCard === "sex") {
      centerTitle = data.gender;
      centerValue = data.genderConfidence;
    }
  }

  let confidence = 0;

  if (activeCard === "race") {
    confidence = data.confidence;
  }

  if (activeCard === "age") {
    confidence = data.ageConfidence;
  }

  if (activeCard === "sex") {
    confidence = data.genderConfidence;
  }

  return (
    <main className="demographics-page">
      {/* NAVBAR */}

      <div className="navbar">
        <div className="nav-left">
          <span className="logo">SKINSTRIC</span>
          <span className="intro">[ INTRO ]</span>
          <span className="analysis">A.I. ANALYSIS</span>
        </div>

        <div className="nav-right">
          <button className="enter-code">ENTER CODE</button>
        </div>
      </div>

      {/* HEADER */}

      <div className="analysis-header">
        <h1 className="page-title">DEMOGRAPHICS</h1>
        <span className="prediction">PREDICTED RACE & AGE</span>
      </div>

      {/* MAIN GRID */}

      <div className="demographics-content">
        {/* LEFT PANEL */}

        <div className="left-panel">
          <div
            className={`info-card ${activeCard === "race" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("race");
              setSelectedLabel(null);
            }}
          >
            <h3>{data.race}</h3>
            <span>RACE</span>
          </div>

          <div
            className={`info-card ${activeCard === "age" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("age");
              setSelectedLabel(null);
            }}
          >
            <h3>{data.age}</h3>
            <span>AGE</span>
          </div>

          <div
            className={`info-card ${activeCard === "sex" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("sex");
              setSelectedLabel(null);
            }}
          >
            <h3>{data.gender}</h3>
            <span>SEX</span>
          </div>
        </div>

        {/* CENTER PANEL */}

        <div className="center-panel">
          <h2 className="center-title">{centerTitle}</h2>

          <div className="circle-chart">
            <svg width="440" height="440" viewBox="0 0 440 440">
              {/* background circle */}
              <circle
                cx="220"
                cy="220"
                r="190"
                stroke="#d9d9d9"
                strokeWidth="8"
                fill="none"
              />

              {/* progress ring */}
              <circle
                className="progress-ring"
                cx="220"
                cy="220"
                r="190"
                stroke="#111"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 190}
                strokeDashoffset={2 * Math.PI * 190 * (1 - centerValue / 100)}
                strokeLinecap="round"
                transform="rotate(-90 220 220)"
              />
            </svg>

            <div className="circle-text">{centerValue}%</div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">
          <div className="confidence-header">
            <span>{activeCard.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          <div className="confidence-list">
            {Object.entries(predictions || {})
              .sort((a: any, b: any) => b[1] - a[1])
              .map(([label, value]: any, i) => (
                <div
                  key={i}
                  className={`confidence-item ${
                    label === centerTitle ? "active" : ""
                  }`}
                  onClick={() => setSelectedLabel(label)}
                >
                  <span className="confidence-label">{label}</span>
                  <span>{Math.round(value * 100)}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}

      <div className="bottom-text">
        If A.I. estimate is wrong, select the correct one.
      </div>

      <Link href="/analysis/select" className="demographics-back-button">
        <div className="demographics-diamond">
          <div className="demographics-diamond-inner-left">◀</div>
        </div>
        <span>BACK</span>
      </Link>

      <a href="/" className="home-button">
        <span>HOME</span>
        <div className="home-diamond">
          <div className="demographics-diamond-inner-right">▶</div>
        </div>
      </a>
    </main>
  );
}

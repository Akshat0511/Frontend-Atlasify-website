import { useState, useEffect, useMemo, useCallback } from "react";
import "./First.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

function First({ onSearch, isLoading }) {
  const navigate = useNavigate();
  const [activeWord, setActiveWord] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rotatingWords = useMemo(
    () => ["React", "Python", "AI", "Design", "DevOps", "Web3"],
    []
  );

  const platforms = useMemo(
    () => [
      { icon: "youtube.png", name: "Youtube", color: "#FF0000" },
      { icon: "github.png", name: "GitHub", color: "#6428bfff" },
      { icon: "articles.png", name: "Articles", color: "#4f8cff" },
      { icon: "instagram.png", name: "Instagram", color: "#f34f6dff" },
      { icon: "tools.png", name: "Tools", color: "#10b981" },
      { icon: "roadmaps.png", name: "Roadmaps", color: "#f9c016ff" },
    ],
    []
  );

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const handleExplore = useCallback(
    (topic) => {
      onSearch?.(topic);
    },
    [onSearch]
  );

  const handleNavigateLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <Header />

      <section className="first">
        <div className="first-content">
          <div className={`first-left ${isVisible ? "visible" : ""}`}>
            <div className="first-badge">
              <span className="badge-pulse"></span>
              <span>AI-Powered Learning</span>
            </div>

            <h1 className="first-title">
              <span className="title-line">One Search.</span>
              <span className="title-line">Every Resource.</span>
              <span className="title-line title-gradient">
                Learn{" "}
                <span className="rotating-word" key={activeWord}>
                  {rotatingWords[activeWord]}
                </span>
              </span>
            </h1>

            <p className="first-subtitle">
              Discover curated learning resources from YouTube, GitHub,
              articles, and more — all aggregated in one beautiful interface.
            </p>

            <div className="first-actions">
              <button
                className="primary-btn"
                disabled={isLoading}
                onClick={handleNavigateLogin}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Start Exploring</span>
                    <span className="btn-icon">→</span>
                  </>
                )}
              </button>

              <button className="secondary-btn">
                <span className="play-icon">💎</span>
                <span>Let's Try</span>
              </button>
            </div>

            <div className="trust-badges">
              <div className="trust-item">
                <span className="trust-number">10K+</span>
                <span className="trust-label">Resources</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">50+</span>
                <span className="trust-label">Topics</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-number">7</span>
                <span className="trust-label">Platforms</span>
              </div>
            </div>
          </div>

          <div className={`first-right ${isVisible ? "visible" : ""}`}>
            <div className="platform-showcase">
              <div className="showcase-glow"></div>

              <div className="platform-grid">
                {platforms.map((platform, index) => (
                  <div
                    key={platform.name}
                    className="platform-card"
                    style={{ "--accent": platform.color }}
                    onClick={() =>
                      handleExplore(
                        rotatingWords[index % rotatingWords.length]
                      )
                    }
                  >
                    <span className="platform-icon">
                      <img
                        className="ICON"
                        src={platform.icon}
                        alt={platform.name}
                        loading="lazy"
                      />
                    </span>
                    <span className="platform-name">{platform.name}</span>
                    <div className="platform-glow"></div>
                  </div>
                ))}
              </div>

              <div className="floating-elements">
                <div className="float-card float-1">🚀 Fast Learning</div>
                <div className="float-card float-2">⚡ Real-time</div>
                <div className="float-card float-3">🎯 Curated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="first-bg-elements">
          <div className="bg-grid"></div>
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
        </div> 
        <Footer />
      </section>

     
    </>
  );
}

export default First;

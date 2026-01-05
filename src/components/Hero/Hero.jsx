import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (topic) => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const popularTopics = [
    "React", "Machine Learning", "Python", "Web Development",
    "Data Science", "JavaScript", "UI/UX Design", "DevOps"
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title">Discover Your</span>
          <span className="title-gradient">Learning Path</span>
        </h1>

        <p className="hero-subtitle">
          Enter any topic and get curated resources from YouTube, Instagram,
          GitHub, and more — all in one place.
        </p>

        {/* Search Form */}
        <form
          className="search-form"
          onSubmit={(e) => { e.preventDefault(); handleSearch(inputValue); }}
        >
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="What do you want to learn today?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`search-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? <span className="loading-spinner"></span> : "Explore"}
            </button>
          </div>
        </form>

        {/* Popular Topics */}
        <div className="popular-topics">
          <span className="popular-label">Popular:</span>
          <div className="topics-list">
            {popularTopics.map((topic) => (
              <button
                key={topic}
                className="topic-chip"
                onClick={() => handleSearch(topic)}
                disabled={isLoading}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Resources</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Topics</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">7</span>
            <span className="stat-label">Platforms</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

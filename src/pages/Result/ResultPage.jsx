import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResourceSection from "../../components/ResourceSection/ResourceSection";
import "./ResultPage.css";
import Footer from "../../components/Footer/Footer";

const ResultsPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [resources, setResources] = useState({
    roadmap: [],
    projects: [],
    articles: [],
    youtube: [],
    github: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe fetch wrapper
  const safeFetch = async (url, body) => {
    try {
      const res = await fetch(url, body);
      if (!res.ok) {
        console.error(`API failed: ${url} - Status: ${res.status}`);
        return [];
      }
      const data = await res.json();

      // Different response types handling
      if (Array.isArray(data)) return data;
      if (data?.roadmap) return data.roadmap;
      if (data?.reply) return data.reply;
      return [];
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllResources = async () => {
      setLoading(true);
      setError(null);

      const body = JSON.stringify({ topic });

      try {
        const [roadmapData, projectsData, articlesData, ytData, ghData] =
          await Promise.all([
            safeFetch(
              "https://backend-atlasify-website.vercel.app/api/roadmap",
              { method: "POST", headers: { "Content-Type": "application/json" }, body }
            ),
            safeFetch(
              "https://backend-atlasify-website.vercel.app/api/projects",
              { method: "POST", headers: { "Content-Type": "application/json" }, body }
            ),
            safeFetch(
              "https://backend-atlasify-website.vercel.app/api/articles",
              { method: "POST", headers: { "Content-Type": "application/json" }, body }
            ),
            safeFetch(
              "https://backend-atlasify-website.vercel.app/api/youtube",
              { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: topic }) }
            ),
            safeFetch(
              "https://backend-atlasify-website.vercel.app/api/github",
              { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: topic }) }
            ),
          ]);

        setResources({
          roadmap: roadmapData || [],
          projects: projectsData || [],
          articles: articlesData || [],
          youtube: ytData || [],
          github: ghData || [],
        });
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load some resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllResources();
  }, [topic]);

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading resources for "{topic}"...</p>
      </div>
    );

  if (error)
    return <p className="error">{error}</p>;

  return (
    <div className="resources-container">
      <div className="app">
        {/* Background effects */}
        <div className="background-effects">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* Heading */}
        <h2 className="Heading-result">
          Learning Resources for
          <strong className="title-result"> 🔸{topic}</strong>
        </h2>

        {/* Chatbot button */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button
            onClick={() => navigate(`/chat?topic=${encodeURIComponent(topic)}`)}
            style={{
              padding: "12px 20px",
              fontSize: "15px",
              borderRadius: "8px",
              background: "#38bdf8",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🤖 Ask AI Mentor about {topic}
          </button>
        </div>

        <ResourceSection
          title="YouTube (Long Videos)"
          type="youtube"
          items={resources.youtube}
        />
        <ResourceSection
          title="GitHub Repositories"
          type="github"
          items={resources.github}
        />
        <ResourceSection
          title="Learning Roadmap"
          type="roadmap"
          items={resources.roadmap}
        />
        <ResourceSection
          title="Project Ideas"
          type="projects"
          items={resources.projects}
        />
        <ResourceSection
          title="Best Articles"
          type="articles"
          items={resources.articles}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ResultsPage;

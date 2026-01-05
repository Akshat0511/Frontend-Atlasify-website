import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (topic) => {
    if (!topic || !topic.trim()) return;
    setIsLoading(true);
    navigate(`/results/${encodeURIComponent(topic.trim())}`);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <>
      <Nav />

      <div className="app">
        {/* Background effects */}
        <div className="background-effects">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {/* Hero Section */}
        <Hero onSearch={handleSearch} isLoading={isLoading} />

   
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate("/chat")}
            style={{
              padding: "14px 22px",
              fontSize: "16px",
              borderRadius: "10px",
              background: "#38bdf8",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🤖 Ask AI Mentor
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

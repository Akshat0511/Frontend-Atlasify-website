import "./RoadmapSection.css";

function RoadmapSection({ roadmap }) {
  return (
    <section className="roadmap-section">
      <h2><img src="roadmaps.png" alt="Roadmap icon representing a learning path or journey" /> Learning Roadmap</h2>

      <div className="roadmap-timeline">
        {roadmap.map((step, index) => (
          <div key={index} className="roadmap-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">{step}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;

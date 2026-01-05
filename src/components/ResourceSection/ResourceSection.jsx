import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceSection.css";

// Auto icon based on section type
const SECTION_ICONS = {
  roadmap: "🧭",
  articles: "📚",
  youtube: "🎬",
  github: "🐙",
  projects: "💡",
  tools: "🛠️"
};

function ResourceSection({ title, type, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="resource-section">
      <div className="section-header">
        <span className="section-icon">{SECTION_ICONS[type]}</span>
        <h3 className="section-title">{title}</h3>
        <span className="item-count">{items.length}</span>
      </div>

      {/* Roadmap = vertical timeline */}
      <div
        className={`cards-grid ${
          type === "roadmap" ? "roadmap-grid" : ""
        }`}
      >
        {items.map((item, index) => (
          <ResourceCard
            key={index}
            item={item}
            type={type}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default ResourceSection;

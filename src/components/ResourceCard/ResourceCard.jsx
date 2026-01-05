import "./ResourceCard.css";

function ResourceCard({ item, type, index }) {
  // Type-based accent color & icon
  const getTypeStyles = () => {
    const styles = {
      youtube: { accent: "var(--accent-red)", icon: "▶️" },
      github: { accent: "var(--accent-purple)", icon: "🐙" },
      roadmap: { accent: "var(--accent-cyan)", icon: `${index + 1}` },
      projects: { accent: "var(--accent-orange)", icon: "💡" },
      tools: { accent: "var(--accent-green)", icon: "🛠️" },
      articles: { accent: "var(--accent-blue)", icon: "📖" }
    };
    return styles[type] || styles.roadmap;
  };

  const { accent, icon } = getTypeStyles();

  // Format ISO 8601 duration to mm:ss / hh:mm:ss
  const formatDuration = (iso) => {
    if (!iso) return "0:00";
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
      : `${minutes}:${seconds.toString().padStart(2,"0")}`;
  };

  return (
    <article className={`resource-card ${type}`} style={{ "--card-accent": accent }}>
      
      {/* YOUTUBE */}
      {type === "youtube" && (
        <>
          <img src={item.thumbnail} alt={item.title} className="youtube-thumb" />
          <div className="card-content">
            <h4>{item.title}</h4>
            <span>⏱️ {formatDuration(item.duration)} | 👁️ {item.views.toLocaleString()} views</span>
            <p>{item.description?.slice(0, 100)}...</p>
            <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer">
              Watch Video →
            </a>
          </div>
        </>
      )}

      {/* GITHUB */}
      {type === "github" && (
        <>
          <img src={item.avatar} alt={item.owner} className="github-avatar" />
          <div className="card-content">
            <h4>{item.full_name}</h4>
            <span>⭐ {item.stars.toLocaleString()} | 🔸 {item.language || "N/A"}</span>
            <p>{item.description?.slice(0, 80)}...</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              View Repo →
            </a>
          </div>
        </>
      )}

      {/* ROADMAP / PROJECTS / TOOLS */}
      {(type === "roadmap" || type === "projects" || type === "tools") && (
        <div className="card-content">
          <span className="card-icon">{icon}</span>
          <p>{item}</p>
        </div>
      )}

      {/* ARTICLES */}
      {type === "articles" && (
        <div className="card-content">
          <span className="card-icon">{icon}</span>
          <h4>{item.title}</h4>
          {item.author && <p className="card-author">✍️ {item.author}</p>}
          {item.description && <p className="card-description">{item.description?.slice(0, 100)}...</p>}
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Read Article →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default ResourceCard;

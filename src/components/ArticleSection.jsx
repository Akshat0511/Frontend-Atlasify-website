import { memo } from "react";
import ResourceCard from "../ResourceCard/ResourceCard";
import "./ResourceSection.css";

const ArticleSection = ({ articles = [] }) => {
  if (!articles.length) return null; // Agar articles empty → render nahi hoga

  return (
    <section className="resource-section">
      <div className="section-header">
        <span className="section-icon">📚</span>
        <h3 className="section-title">Best Articles</h3>
        <span className="item-count">{articles.length}</span>
      </div>

      <div className="cards-grid">
        {articles.map((article, index) => (
          <ResourceCard
            key={article.url || `article-${index}`}
            item={article}
            type="articles"
          />
        ))}
      </div>
    </section>
  );
};

export default memo(ArticleSection);

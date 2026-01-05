export const fetchRoadmap = async (topic) => {
  const res = await fetch("https://backend-atlasify-website.vercel.app//api/roadmap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic })
  });

  return res.json();
};

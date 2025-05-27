import RecipeCard from "../components/Molecules/RecipeCard/RecipeCard";
import fatal from "../assets/fatal.png";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "red" }}>Home</h1>
      <RecipeCard
        title="Spaghetti Carbonara"
        image={fatal}
        description="Un plat italien délicieux avec œuf, fromage et lardons."
      />
    </div>
  );
}

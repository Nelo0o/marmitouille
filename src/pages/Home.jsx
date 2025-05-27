import RecipeCard from "@components/molecules/RecipeCard/RecipeCard";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "red" }}>Home</h1>
      <RecipeCard
        title="Spaghetti Carbonara"
        image="https://placehold.co/400"
        description="Un plat italien délicieux avec œuf, fromage et lardons."
        />
    </div>
  );
}

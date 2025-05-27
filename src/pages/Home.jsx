import RecipeSearch from "../components/Atoms/RecipeSearch/RecipeSearch";
RecipeSearch;

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      {" "}
      <RecipeSearch />
      <h1 style={{ color: "red" }}>Home</h1>
    </div>
  );
}

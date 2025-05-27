import RecipeSearch from "../components/Atoms/RecipeSearch/RecipeSearch";
import RecipeManager from "../components/Atoms/RecipeManager/RecipeManager";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "red" }}>Accueil</h1>
      {currentUser ? (
        <RecipeManager />
      ) : (
        <p style={{ marginTop: "2rem" }}>
          Attention: Connectez-vous pour gérer vos recettes
        </p>
      )}
      <RecipeSearch />
    </div>
  );
}

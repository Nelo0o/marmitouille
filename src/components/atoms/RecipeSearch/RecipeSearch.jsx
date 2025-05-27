import { useState } from "react";
import RecipeCard from "../../Molecules/RecipeCard/RecipeCard";
import recipesData from "../../../data/recipes.json";
import "./RecipeSearch.scss";
import { useAuth } from "../../../context/AuthContext";

export default function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  const filteredRecipes = recipesData.filter((recipe) =>
    `${recipe.title} ${recipe.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-search">
      <input
        type="text"
        className="recipe-search-input"
        placeholder="Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {user && (
        // eslint-disable-next-line no-undef
        <button onClick={() => setShowForm(true)}>
          ➕ Ajouter une recette
        </button>
      )}
      <div className="recipe-search-results">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
            />
          ))
        ) : (
          <p className="no-result">Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import RecipeCard from "../../Molecules/RecipeCard/RecipeCard";
import recipesData from "../../../data/recipes.json";
import "./RecipeSearch.scss";

export default function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState("");

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

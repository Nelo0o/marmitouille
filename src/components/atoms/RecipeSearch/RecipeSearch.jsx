import "./RecipeSearch.scss";

export default function RecipeSearch() {
  return (
    <div className="recipe-search">
      <input
        type="text"
        className="recipe-search-input"
        placeholder="Rechercher une recette..."
      />
      <div className="recipe-search-results">
        <p className="no-result">Aucune recette trouvée.</p>
      </div>
    </div>
  );
}

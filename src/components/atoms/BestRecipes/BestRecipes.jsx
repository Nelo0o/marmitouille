import { useState, useEffect } from "react";
import "./BestRecipes.scss";
import RecipeCard from "@molecules/RecipeCard/RecipeCard";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@firebase-config";

export default function BestRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipesQuery = query(
          collection(db, "recipes"),
          orderBy("title"),
          limit(20)
        );
        
        const snapshot = await getDocs(recipesQuery);
        const recipesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRecipes(recipesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    `${recipe.title} ${recipe.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="best-recipes">
      <div className="best-recipes__header">
        <h2 data-testId="bestRecipesTitle" className="best-recipes__title">Les meilleures recettes</h2>
        <div className="best-recipes__search-container">
          <input
            type="text"
            className="best-recipes__search-input"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="best-recipes__grid">
        {loading ? (
          <div className="best-recipes__loading">
            <div className="best-recipes__spinner"></div>
            <p>Chargement des recettes...</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image || 'https://placehold.co/400'}
              difficulty={recipe.difficulty}
              cost={recipe.cost}
              onClick={() => console.log(`Recette sélectionnée: ${recipe.title}`)}
            />
          ))
        ) : (
          <p className="best-recipes__no-result">Aucune recette trouvée.</p>
        )}
      </div>
    </section>
  );
}

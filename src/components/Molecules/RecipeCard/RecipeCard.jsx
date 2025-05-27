import "./RecipeCard.scss";

export default function RecipeCard({ title, image, description, onClick }) {
  return (
    <div data-testid="recipeCard" className="recipe-card" onClick={onClick}>
      <img data-testid="recipeImage" src={image} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h3 data-testid="recipeTitle" className="recipe-title">{title}</h3>
        <p data-testid="recipeDescription" className="recipe-description">{description}</p>
      </div>
    </div>
  );
}

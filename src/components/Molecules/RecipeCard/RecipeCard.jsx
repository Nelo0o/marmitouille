import "./RecipeCard.scss";

export default function RecipeCard({ title, image, description, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-description">{description}</p>
      </div>
    </div>
  );
}

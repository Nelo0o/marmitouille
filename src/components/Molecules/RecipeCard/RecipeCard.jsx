import "./RecipeCard.scss";

export default function RecipeCard({ title, image, description, onClick, cookTime, difficulty }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={image} alt={title} className="recipe-card__image" />
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{title}</h3>
        <p className="recipe-card__description">{description}</p>
        
        {(cookTime || difficulty) && (
          <div className="recipe-card__meta">
            {cookTime && (
              <div className="recipe-card__time">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{cookTime} min</span>
              </div>
            )}
            
            {difficulty && (
              <div className={`recipe-card__difficulty recipe-card__difficulty--${difficulty.toLowerCase()}`}>
                {difficulty}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

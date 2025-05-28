import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RecipeCard from "./RecipeCard";

describe("RecipeCard component", () => {
  const mockProps = {
    title: "Tarte aux pommes",
    image: "https://example.com/tarte.jpg",
    description: "Une délicieuse tarte faite maison.",
    onClick: vi.fn(),
  };

  it("should render the title, image, and description using test ids", () => {
    render(<RecipeCard {...mockProps} />);

    expect(screen.getByTestId("recipeTitle")).toHaveTextContent("Tarte aux pommes");
    expect(screen.getByTestId("recipeDescription")).toHaveTextContent("Une délicieuse tarte faite maison.");
    expect(screen.getByTestId("recipeImage")).toHaveAttribute("src", mockProps.image);
    expect(screen.getByTestId("recipeImage")).toHaveAttribute("alt", mockProps.title);
  });

  it("should call onClick when the card is clicked", () => {
    render(<RecipeCard {...mockProps} />);
    fireEvent.click(screen.getByTestId("recipeCard"));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("should show difficulty with correct emoji and class", () => {
    render(<RecipeCard {...mockProps} difficulty="Facile" />);
    const difficulty = screen.getByText("Facile");
    expect(difficulty).toBeInTheDocument();
    expect(difficulty.previousSibling).toHaveTextContent("🟢");
    expect(difficulty.parentElement).toHaveClass("recipe-card__difficulty--facile");
  });

  it("should display cost if provided", () => {
    render(<RecipeCard {...mockProps} cost="€" />);
    expect(screen.getByText("€")).toBeInTheDocument();
  });

  it("should render actions when provided", () => {
    render(<RecipeCard {...mockProps} actions={<button>Modifier</button>} />);
    expect(screen.getByRole("button", { name: /modifier/i })).toBeInTheDocument();
  });

  it("should not display 'Voir la recette' if actions are provided", () => {
    render(<RecipeCard {...mockProps} actions={<button>Modifier</button>} />);
    expect(screen.queryByText(/Voir la recette/i)).not.toBeInTheDocument();
  });

  it("should display 'Voir la recette' if actions are not provided", () => {
    render(<RecipeCard {...mockProps} />);
    expect(screen.getByText(/Voir la recette/i)).toBeInTheDocument();
  });

  it("should display placeholder if image fails to load", () => {
    render(<RecipeCard {...mockProps} />);
    const image = screen.getByTestId("recipeImage");
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", expect.stringContaining("placeholder"));
  });

  it("should add hovered class on mouse enter and remove on mouse leave", () => {
    render(<RecipeCard {...mockProps} />);
    const card = screen.getByTestId("recipeCard");

    fireEvent.mouseEnter(card);
    expect(card.className).toContain("recipe-card--hovered");

    fireEvent.mouseLeave(card);
    expect(card.className).not.toContain("recipe-card--hovered");
  });
});

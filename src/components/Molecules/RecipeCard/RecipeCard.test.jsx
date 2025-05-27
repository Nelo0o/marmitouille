import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RecipeCard from "./RecipeCard.jsx";

describe("RecipeCard component", () => {
  const mockProps = {
    title: "Tarte aux pommes",
    image: "https://example.com/tarte.jpg",
    description: "Une délicieuse tarte faite maison.",
    onClick: vi.fn(),
  };

  it("should render the title, image, and description using test ids", () => {
    render(<RecipeCard {...mockProps} />);

    const title = screen.getByTestId("recipeTitle");
    const description = screen.getByTestId("recipeDescription");
    const image = screen.getByTestId("recipeImage");

    expect(title).toHaveTextContent("Tarte aux pommes");
    expect(description).toHaveTextContent("Une délicieuse tarte faite maison.");
    expect(image).toHaveAttribute("src", "https://example.com/tarte.jpg");
    expect(image).toHaveAttribute("alt", "Tarte aux pommes");
  });

  it("should call onClick when the card is clicked", () => {
    render(<RecipeCard {...mockProps} />);

    const card = screen.getByTestId("recipeCard");
    fireEvent.click(card);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});

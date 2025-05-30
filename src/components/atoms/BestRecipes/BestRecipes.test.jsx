import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BestRecipes from "./BestRecipes";
import { vi } from "vitest";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore"); // Import partiel

  return {
    ...actual,
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    getFirestore: vi.fn(() => ({})), // Ajout du mock manquant
  };
});

// Mock de RecipeCard
vi.mock("@molecules/RecipeCard/RecipeCard", () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid="recipe-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe("BestRecipes component", () => {
  const mockRecipes = [
    {
      id: "1",
      title: "Tarte aux pommes",
      description: "Délicieuse tarte",
      image: "",
      difficulty: "facile",
      cost: "€",
    },
    {
      id: "2",
      title: "Gâteau au chocolat",
      description: "Moelleux et fondant",
      image: "",
      difficulty: "moyen",
      cost: "€€",
    },
  ];

  beforeEach(() => {
    getDocs.mockResolvedValue({
      docs: mockRecipes.map((r) => ({
        id: r.id,
        data: () => r,
      })),
    });
  });

  it("should render title", () => {
    render(<BestRecipes />);
    expect(screen.getByTestId("bestRecipesTitle")).toHaveTextContent("Les meilleures recettes");

  });

  it("should display loading and get all recipe card", async () => {
    render(<BestRecipes />);
    expect(screen.getByText("Chargement des recettes...")).toBeInTheDocument();

    await waitFor(() => screen.getAllByTestId("recipe-card"));
  });
});
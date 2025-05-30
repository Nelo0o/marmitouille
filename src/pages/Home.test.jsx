import { render, screen } from "@testing-library/react";
import Home from "./Home";

vi.mock("@components/atoms/Hero/Hero", () => ({
  default: ({ title }) => <div data-testid="hero">{title}</div>,
}));

vi.mock("@components/atoms/BestRecipes/BestRecipes", () => ({
  default: () => <div data-testid="best-recipes">Mocked BestRecipes</div>,
}));

describe("Home component", () => {
  it("should render Hero and BestRecipes components", () => {
    render(<Home />);

    expect(screen.getByTestId("hero")).toHaveTextContent("Bienvenue sur Marmitouille");

    expect(screen.getByTestId("best-recipes")).toBeInTheDocument();
  });
});

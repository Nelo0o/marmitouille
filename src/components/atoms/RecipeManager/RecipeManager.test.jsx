import { render, screen, fireEvent, waitFor, within  } from "@testing-library/react";
import RecipeManager from "./RecipeManager";
import { vi } from "vitest";
import { useAuth } from "../../../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const mockCollectionRef = { fake: 'collectionRef' };


vi.mock("@context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(() => mockCollectionRef),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
}));

vi.mock("RecipeCard", () => ({
  default: ({ title, onClick, actions }) => (
    <div>
      <h3 onClick={onClick}>{title}</h3>
      <div data-testid="suppRecipe">{actions}</div>
    </div>
  ),
}));

vi.mock("ConfirmDialog", () => ({
  default: ({ isOpen, onConfirm, onClose, message }) =>
  isOpen ? (
    <div data-testid="confirmPopUp">
      <p>{message}</p>
      <button data-testid="confirmSupp" onClick={onConfirm}>Supprimer</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  ) : null,
}));


describe("RecipeManager test", () => {
  const mockUser = {
    uid: "totobg",
    email: "toto@coucou.hey",
  };

  beforeEach(() => {
    useAuth.mockReturnValue({ currentUser: mockUser });
    getDocs.mockResolvedValue({ docs: [] });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render empty form", () => {
    render(<RecipeManager />);

    expect(screen.getByTestId("modOrAddRecipe")).toHaveTextContent("Ajouter une nouvelle recette");
    expect(screen.getByTestId("noRecipe")).toHaveTextContent("Vous n'avez pas encore créé de recettes");
  });

  it("should test add recipe", async () => {
    const mockDocRef = { id: "totoDocRef" };
    addDoc.mockResolvedValue(mockDocRef);

    render(<RecipeManager />);

    fireEvent.change(screen.getByTestId("titleRecipe"), {
      target: { value: "Tarte de toto", name: "title" },
    });

    fireEvent.change(screen.getByTestId("descRecipe"), {
      target: { value: "Normal c'est moi qui l'ai fait!", name: "description" },
    });

    fireEvent.click(screen.getByTestId("buttonSubmitRecipe"));

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        title: "Tarte de toto",
        description: "Normal c'est moi qui l'ai fait!",
        ownerId: "totobg",
      }));
    });
  });

it("should delete a recipe after confirmation", async () => {
  const mockRecipe = {
    id: "r1",
    data: () => ({
      title: "Tarte salé du papa de toto",
      description: "Tarte trop salé",
      image: "",
      ingredients: ["beaucoup trop de sel"],
      steps: ["rajouter du sel"],
      difficulty: "extrême",
      cost: "sel€",
      ownerId: "totobg",
      ownerEmail: "toto@coucou.hey",
    }),
  };

  getDocs.mockResolvedValue({
    docs: [mockRecipe],
  });

  const mockDocRef = { id: mockRecipe.id };
  doc.mockReturnValue(mockDocRef);

  render(<RecipeManager />);

  const recipeTitle = await screen.findByText(mockRecipe.data().title);
  expect(recipeTitle).toBeInTheDocument();

  const deleteButton = screen.getByText(/supprimer/i);
  fireEvent.click(deleteButton);

  const confirmPopup = await screen.findByTestId("confirmPopUp");
  expect(confirmPopup).toBeInTheDocument();

  const confirmButton = within(confirmPopup).getByTestId("confirmSupp");
  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
  });
});

});

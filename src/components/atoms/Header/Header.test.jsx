import { render, screen, fireEvent  } from '@testing-library/react'
import { describe, it, expect, vi } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import Header from "./Header.jsx"

// Mock du contexte AuthContext
vi.mock("../../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("Header component", () => {
    it("should test the logo display", () => {
        useAuth.mockReturnValue({ user: null, logout: vi.fn() });
    
        renderWithRouter(<Header />);
        
        expect(screen.getByTestId("navLinkLogo")).toHaveTextContent("Marmitouille");
    });

    it("should test the nav display when user is null", () => {
      useAuth.mockReturnValue({ user: null, logout: vi.fn() });
  
      renderWithRouter(<Header />);
      
      expect(screen.getByTestId("navLinkLogin")).toHaveTextContent("Connexion");
      expect(screen.getByTestId("navLinkRegister")).toHaveTextContent("Inscription");
    });

    it("should test the nav display when user is log", () => {
      useAuth.mockReturnValue({ currentUser: {uid: "uidMock",displayName: "totoMock"}, logout: vi.fn() });
  
      renderWithRouter(<Header />);

      const button = screen.getByTestId("buttonInfoAccount");
      fireEvent.click(button);
      
      expect(screen.getByTestId("spanWelcome")).toHaveTextContent("totoMock");
      expect(screen.getByTestId("coucou")).toHaveTextContent("Déconnexion");
    });
});

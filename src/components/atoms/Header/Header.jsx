import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <NavLink data-testId="navLinkLogo" to="/" className="logo">
          MARMITOUILLE
        </NavLink>
      </div>
      <nav className="header-nav">
        {!currentUser ? (
          <>
            <NavLink data-testId="navLinkLogin" to="/login" className="login_link">
              Connexion
            </NavLink>
            <NavLink data-testId="navLinkRegister" to="/register" className="register_link">
              Inscription
            </NavLink>
          </>
        ) : (
          <div className="user-menu">
            <span data-testId="spanWelcome" className="welcome-msg">
              Bienvenue, {currentUser.displayName}
            </span>
            <button data-testId="buttonLogout" className="logout-btn" onClick={logout}>
              Déconnexion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" data-testid="navLinkLogo" className="logo">
          MARMITOUILLE
        </NavLink>
      </div>
      <nav className="header-nav">
        {!currentUser ? (
          <>
            <NavLink to="/login" data-testid="navLinkLogin" className="login_link">
              Connexion
            </NavLink>
            <NavLink to="/register" data-testid="navLinkRegister" className="register_link">
              Inscription
            </NavLink>
          </>
        ) : (
          <div className="user-menu">
            <span className="welcome-msg">
              Bienvenue, {currentUser.displayName}
            </span>
            <button className="logout-btn" onClick={logout}>
              Déconnexion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

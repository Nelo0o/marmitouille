import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" className="logo">
          Marmitouille
        </NavLink>
      </div>
      <nav className="header-nav">
        {!currentUser ? (
          <>
            <NavLink to="/login" className="login_link">
              Connexion
            </NavLink>
            <NavLink to="/register" className="register_link">
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

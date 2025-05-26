import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" className="logo">
          MARMITOUILLE
        </NavLink>
      </div>
      <nav className="header-nav">
        {!user ? (
          <>
            <NavLink to="/login" className="login_link">
              Connexion
            </NavLink>
            <NavLink to="/register" className="register_link">
              Inscription
            </NavLink>
          </>
        ) : (
          <>
            <button className="logout-btn" onClick={logout}>
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

import "./Header.scss";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <NavLink to="/" className="logo">
          MARMITOUILLE
        </NavLink>
      </div>
      <nav className="header-nav">
        <NavLink to="/login" className="login_link">
          Connexion
        </NavLink>
        <NavLink to="/register" className="register_link">
          Inscription
        </NavLink>
      </nav>
    </header>
  );
}

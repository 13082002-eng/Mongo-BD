import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar">
        <h1>Mi E-commerce</h1>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>

          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            Productos
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
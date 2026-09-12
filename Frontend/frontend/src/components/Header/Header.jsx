import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, selectIsAdmin } from "../../store/authSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const isAdmin = useSelector(selectIsAdmin);

  const { items, loading } = useSelector((state) => state.cart);
  const { productIds } = useSelector((state) => state.wishlist);

  const handleLogout = async () => {
  await dispatch(logoutThunk());
  setMenuOpen(false);
  navigate("/login");
  };

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
            🏠 Inicio
          </NavLink>

          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            🛍️ Productos
          </NavLink>

          {token && (
          <>
            {isAdmin && (
              <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
                  👑 Admin
              </NavLink>
            )}

              <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
                ❤️ Favoritos ({productIds.length})
              </NavLink>

              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                🛒 Carrito ({loading ? "..." : items.length})
              </NavLink>

              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                👤 Perfil
              </NavLink>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                🚪 Cerrar sesión
              </button>
            </>
          )}

          {!token && (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                🔐 Iniciar sesión
              </NavLink>

              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                📝 Registrarse
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
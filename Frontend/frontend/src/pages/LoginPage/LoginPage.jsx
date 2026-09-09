import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../../store/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const emailRef = useRef(null);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Completa todos los campos.");
      return;
    }

    const result = await dispatch(
      loginThunk({
        email,
        password,
      })
    );

    if (loginThunk.fulfilled.match(result)) {
      alert("Login correcto");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            ref={emailRef}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
          />
        </div>

        {formError && <p>{formError}</p>}

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default LoginPage;
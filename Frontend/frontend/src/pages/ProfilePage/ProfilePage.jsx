import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h2>Mi perfil</h2>

      {user ? (
        <>
          <p>
            <strong>Usuario:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No hay información del usuario.</p>
      )}
    </div>
  );
};

export default ProfilePage;
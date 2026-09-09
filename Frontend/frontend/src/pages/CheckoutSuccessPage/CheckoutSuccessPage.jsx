import { Link } from "react-router-dom";

const CheckoutSuccessPage = () => {
  return (
    <div>
      <h2>¡Compra realizada correctamente! 🎉</h2>

      <p>Gracias por tu compra.</p>

      <Link to="/products">
        Volver al catálogo
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;
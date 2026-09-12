import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const CheckoutSuccessPage = () => {
  useEffect(() => {
    const clearCart = async () => {
      try {
        await api.delete("/cart");
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
      }
    };

    clearCart();
  }, []);

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
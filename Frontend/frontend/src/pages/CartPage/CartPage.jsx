import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchCart,
  addCartItem,
  decreaseCartItem,
  removeCartItem,
  checkout,
} from "../../store/cartSlice";

import useProducts from "../../hooks/useProducts";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector(
    (state) => state.cart
  );

  const {
    data: products,
    loading: productsLoading,
  } = useProducts();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (productId) => {
    dispatch(
      addCartItem({
        productId,
        quantity: 1,
      })
    );
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseCartItem(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleCheckout = async () => {
    const result = await dispatch(checkout());

    if (checkout.fulfilled.match(result)) {
      window.location.href = result.payload.url;
    }
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return sum;
      }

      return sum + product.price * item.quantity;
    }, 0);
  }, [items, products]);

  if (loading || productsLoading) {
    return <h2>Cargando carrito...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Mi carrito 🛒</h2>

      {items.length === 0 ? (
        <p className="cart-empty">
          Tu carrito está vacío.
        </p>
      ) : (
        <>
          <div className="cart-products">
            {items.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId
              );

              if (!product) {
                return null;
              }

              return (
                <div
                  className="cart-product"
                  key={item.productId}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  <div className="cart-product-info">
                    <h3>{product.name}</h3>

                    <p className="cart-product-price">
                      {product.price.toFixed(2)} €
                    </p>

                    <div className="cart-quantity">
                      <span>Cantidad:</span>

                      <div className="cart-quantity-controls">
                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            handleDecrease(item.productId)
                          }
                        >
                          −
                        </button>

                        <span className="cart-quantity-value">
                          {item.quantity}
                        </span>

                        <button
                          className="cart-quantity-button"
                          onClick={() =>
                            handleIncrease(item.productId)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="cart-subtotal">
                      Subtotal:{" "}
                      <strong>
                        {(product.price * item.quantity).toFixed(2)} €
                      </strong>
                    </p>

                    <button
                      className="cart-remove-button"
                      onClick={() =>
                        handleRemove(item.productId)
                      }
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total: {total.toFixed(2)} €</h3>

            <button
              className="cart-checkout-button"
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
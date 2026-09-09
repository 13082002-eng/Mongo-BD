import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  toggleWishlist,
} from "../../store/wishlistSlice";
import useProducts from "../../hooks/useProducts";

const WishlistPage = () => {
  const dispatch = useDispatch();

  const {
    productIds,
    loading,
    error,
  } = useSelector((state) => state.wishlist);

  const {
    data: products,
    loading: productsLoading,
  } = useProducts();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(toggleWishlist(productId));
  };

  const wishlistProducts = products.filter((product) =>
    productIds.includes(product.id)
  );

  if (loading || productsLoading) {
    return <h2>Cargando wishlist...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>Mi lista de deseos ❤️</h2>

      {wishlistProducts.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <div>
          {wishlistProducts.map((product) => (
            <div key={product.id}>
              <img
                src={product.imageUrl}
                alt={product.name}
                width="150"
              />

              <h3>{product.name}</h3>

              <p>{product.price.toFixed(2)} €</p>

              <button
                onClick={() => handleRemove(product.id)}
              >
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
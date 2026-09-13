import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useProduct from "../../hooks/useProduct";
import useReviews from "../../hooks/useReviews";
import { addCartItem } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const productIds = useSelector(
    (state) => state.wishlist.productIds
  );

  const isFavorite = productIds.includes(id);

  const {
    data: product,
    loading,
    error,
  } = useProduct(id);

  const {
    data: reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useReviews(id);

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setReviewList(reviews || []);
  }, [reviews]);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const result = await dispatch(
      addCartItem({
        productId: id,
        quantity,
      })
    );

    if (addCartItem.fulfilled.match(result)) {
      alert("Producto añadido al carrito");
    }
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(id));
  };

  if (loading) {
    return <h2>Cargando producto...</h2>;
  }

  if (error) {
    return <h2>Error al cargar el producto.</h2>;
  }

  if (!product) {
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/products">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link className="back-link" to="/products">
        ← Volver al catálogo
      </Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="product-detail-info">
          <h2>{product.name}</h2>

          <p className="product-description">
            {product.description}
          </p>

          <p className="product-price">
            {product.price.toFixed(2)} €
          </p>

          <p className="product-stock">
            Stock disponible: {product.stock}
          </p>

          <div className="quantity">
            <span>Cantidad:</span>

            <div className="quantity-controls">
              <button
                className="quantity-button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
              >
                −
              </button>

              <span className="quantity-value">
                {quantity}
              </span>

              <button
                className="quantity-button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(product.stock, current + 1)
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              🛒 Añadir al carrito
            </button>

            <button
              className={`wishlist-button ${
                isFavorite ? "favorite" : ""
              }`}
              onClick={handleToggleWishlist}
            >
              {isFavorite
                ? "💔 Quitar de favoritos"
                : "❤️ Añadir a favoritos"}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h3>Reseñas</h3>

        {reviewsLoading && (
          <p>Cargando reseñas...</p>
        )}

        {reviewsError && (
          <p>Error al cargar las reseñas.</p>
        )}

        {!reviewsLoading &&
          !reviewsError &&
          reviewList.length === 0 && (
            <p>No hay reseñas todavía.</p>
          )}

        {!reviewsLoading &&
          !reviewsError &&
          reviewList.map((review) => (
            <div key={review._id}>
              <strong>{review.username}</strong>

              <p>
                ⭐ {review.rating}/5
              </p>

              <p>{review.comment}</p>
            </div>
          ))}

        {user && (
          <ReviewForm
            productId={id}
            username={user.username}
            onReviewCreated={(newReview) => {
              setReviewList((current) => [
                ...current,
                newReview,
              ]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
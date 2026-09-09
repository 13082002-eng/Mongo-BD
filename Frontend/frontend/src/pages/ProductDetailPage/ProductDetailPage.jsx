import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useReviews from "../../hooks/useReviews";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data: product, loading, error } = useProduct(id);

  const {
  data: reviews,
  loading: reviewsLoading,
  error: reviewsError,
} = useReviews(id);

  const [quantity, setQuantity] = useState(1);

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
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
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
        </div>
      </div>
            <div className="reviews">
        <h3>Reseñas</h3>

        {reviewsLoading && <p>Cargando reseñas...</p>}

        {reviewsError && (
          <p>Error al cargar las reseñas.</p>
        )}

        {!reviewsLoading &&
          !reviewsError &&
          reviews.length === 0 && (
            <p>No hay reseñas todavía.</p>
          )}

        {!reviewsLoading &&
          !reviewsError &&
          reviews.map((review) => (
            <div key={review._id}>
              <strong>{review.username}</strong>
              <p>⭐ {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
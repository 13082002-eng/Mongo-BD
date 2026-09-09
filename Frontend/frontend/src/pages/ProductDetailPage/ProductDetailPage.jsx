import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "../../data/mockProducts";

const ProductDetailPage = () => {
  const { id } = useParams();

  const product = MOCK_PRODUCTS.find(
    (product) => product.id === id
  );

  const [quantity, setQuantity] = useState(1);

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
    </div>
  );
};

export default ProductDetailPage;
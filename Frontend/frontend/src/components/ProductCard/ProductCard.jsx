import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
        />

        <div className="product-card-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <strong>{product.price.toFixed(2)} €</strong>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
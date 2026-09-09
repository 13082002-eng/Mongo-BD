import { MOCK_PRODUCTS } from "../../data/mockProducts";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const HomePage = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div>
      <h2>Bienvenido a nuestra tienda</h2>

      <p>Descubre nuestros productos destacados.</p>

      <ProductGrid products={featuredProducts} />
    </div>
  );
};

export default HomePage;
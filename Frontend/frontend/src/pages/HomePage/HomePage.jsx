import ProductGrid from "../../components/ProductGrid/ProductGrid";
import useProducts from "../../hooks/useProducts";

const HomePage = () => {
  const { data: products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los productos.</h2>;
  }

  return (
    <div>
      <h2>Bienvenido a nuestra tienda</h2>

      <p>Descubre nuestros productos destacados.</p>

      <ProductGrid products={featuredProducts} />
    </div>
  );
};

export default HomePage;
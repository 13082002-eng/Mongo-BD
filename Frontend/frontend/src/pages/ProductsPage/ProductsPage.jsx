import { useState } from "react";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  const { data: products, loading, error } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los productos.</h2>;
  }

  return (
    <div>
      <h2>Catálogo de productos</h2>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;
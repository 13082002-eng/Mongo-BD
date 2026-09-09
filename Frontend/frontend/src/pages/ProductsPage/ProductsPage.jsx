import { useState } from "react";
import { MOCK_PRODUCTS } from "../../data/mockProducts";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
import { useMemo, useState } from "react";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: products, loading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice()
      .sort((a, b) => {
        if (sortBy === "priceAsc") {
          return a.price - b.price;
        }

        if (sortBy === "priceDesc") {
          return b.price - a.price;
        }

        if (sortBy === "nameAsc") {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });
  }, [products, search, sortBy]);

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los productos.</h2>;
  }

  return (
    <div>
      <h2>Catálogo de productos</h2>

      <div className="product-filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="priceAsc">
            Precio: menor a mayor
          </option>
          <option value="priceDesc">
            Precio: mayor a menor
          </option>
          <option value="nameAsc">
            Nombre: A-Z
          </option>
        </select>
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;
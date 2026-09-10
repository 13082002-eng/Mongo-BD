import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../../api/products";
import ProductForm from "../../components/ProductForm/ProductForm";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductSaved = (savedProduct) => {
    setProducts((currentProducts) => {
      const exists = currentProducts.some(
        (product) => product.id === savedProduct.id
      );

      if (exists) {
        return currentProducts.map((product) =>
          product.id === savedProduct.id ? savedProduct : product
        );
      }

      return [...currentProducts, savedProduct];
    });

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "¿Seguro que quieres eliminar este producto?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteProduct(id);

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Error al eliminar el producto"
    );
  }
};

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Bienvenido al panel de administración</p>

      <button
        onClick={() => {
          setEditingProduct(null);
          setShowForm(!showForm);
        }}
      >
        {showForm && !editingProduct
          ? "❌ Cancelar"
          : "➕ Añadir producto"}
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onProductSaved={handleProductSaved}
          onCancel={handleCancel}
        />
      )}

      <h2>Productos</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>Precio: {product.price} €</p>

          <p>Stock: {product.stock}</p>

          <button onClick={() => handleEdit(product)}>
            ✏️ Editar
          </button>
          <button onClick={() => handleDelete(product.id)}>
            🗑️ Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
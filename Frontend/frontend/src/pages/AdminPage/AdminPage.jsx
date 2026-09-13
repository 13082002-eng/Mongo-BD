import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/products";
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

    if (!confirmed) return;

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
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Bienvenido al panel de administración</p>

        <button
          className="admin-add-button"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
        >
          {showForm && !editingProduct
            ? "❌ Cancelar"
            : "➕ Añadir producto"}
        </button>
      </div>

      {showForm && !editingProduct && (
        <div className="admin-form-container">
          <ProductForm
            product={null}
            onProductSaved={handleProductSaved}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="admin-products">
        <div className="admin-products-header">
          <h2>Productos</h2>
          <span>{products.length} productos</span>
        </div>

        <div className="admin-product-list">
          {products.map((product) => (
            <div className="admin-product-card" key={product.id}>
              <div className="admin-product-info">
                <h3>{product.name}</h3>

                <div className="admin-product-data">
                  <span>
                    <strong>Precio:</strong> {product.price} €
                  </span>

                  <span>
                    <strong>Stock:</strong> {product.stock}
                  </span>
                </div>
              </div>

              <div className="admin-product-actions">
                <button
                  className="admin-edit-button"
                  onClick={() => handleEdit(product)}
                >
                  ✏️ Editar
                </button>

                <button
                  className="admin-delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>

              {editingProduct?.id === product.id && (
                <div className="admin-edit-form">
                  <ProductForm
                    product={editingProduct}
                    onProductSaved={handleProductSaved}
                    onCancel={handleCancel}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
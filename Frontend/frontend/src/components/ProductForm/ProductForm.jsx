import { useState } from "react";
import { createProduct, updateProduct } from "../../api/products";

function ProductForm({ product, onProductSaved, onCancel }) {
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.price) <= 0) {
      alert("El precio debe ser mayor que 0");
      return;
    }

    if (Number(formData.stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    if (!isEditing && !image) {
      alert("Debes seleccionar una imagen");
      return;
    }

    const data = new FormData();

    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", Number(formData.price));
    data.append("stock", Number(formData.stock));

    if (image) {
      data.append("image", image);
    }

    try {
      let response;

      if (isEditing) {
        response = await updateProduct(product.id, data);
      } else {
        response = await createProduct(data);
      }

      onProductSaved(response.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error al guardar el producto"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar producto" : "Añadir producto"}</h2>

      <input
        type="text"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        required
        disabled={isEditing}
      />

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />

      <label>
        Imagen del producto:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!isEditing}
        />
      </label>

      <button type="submit">
        {isEditing ? "Guardar cambios" : "Crear producto"}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProductForm;
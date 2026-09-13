import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const imageMap = {
  "/src/assets/camiseta-blanca.avif": "/assets/camiseta-blanca.avif",
  "/src/assets/sudadera.jpg": "/assets/sudadera.jpg",
  "/src/assets/vaqueros-acampanados.jpg": "/assets/vaqueros-acampanados.jpg",
  "/src/assets/zapatillas.webp": "/assets/zapatillas.webp",
  "/src/assets/mochila.webp": "/assets/mochila.webp",
  "/src/assets/gorra.webp": "/assets/gorra.webp",
  "/src/assets/chaqueta_ligera.jpg": "/assets/chaqueta_ligera.jpg",
  "/src/assets/bolso.jpg": "/assets/bolso.jpg",
  "/src/assets/reloj.webp": "/assets/reloj.webp",
};

const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        const products = response.data.map((product) => ({
          ...product,
          imageUrl: imageMap[product.imageUrl] || product.imageUrl,
        }));

        setData(products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, loading, error };
};

export default useProducts;
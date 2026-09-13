import { useEffect, useState } from "react";
import { getProductById } from "../api/products";

const imageMap = {
  "1": "/assets/camiseta-blanca.avif",
  "2": "/assets/sudadera.jpg",
  "3": "/assets/vaqueros-acampanados.jpg",
  "4": "/assets/zapatillas.webp",
  "5": "/assets/mochila.webp",
  "6": "/assets/gorra.webp",
  "7": "/assets/chaqueta_ligera.jpg",
  "8": "/assets/sudadera.jpg",
  "9": "/assets/bolso.jpg",
  "10": "/assets/reloj.webp",
};

const useProduct = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getProductById(id);

        const product = {
          ...response.data,
          imageUrl:
            imageMap[response.data.id] ||
            response.data.imageUrl,
        };

        setData(product);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};

export default useProduct;
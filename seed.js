const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    id: "1",
    name: "Camiseta Básica",
    description: "Camiseta de algodón 100%, cómoda y disponible en varios colores.",
    price: 19.99,
    stock: 50,
    imageUrl: "/src/assets/camiseta-blanca.avif"
  },
  {
    id: "2",
    name: "Sudadera Clásica",
    description: "Sudadera cómoda y cálida, perfecta para el día a día.",
    price: 39.99,
    stock: 30,
    imageUrl: "/src/assets/sudadera.jpg"
  },
  {
    id: "3",
    name: "Pantalón Vaquero",
    description: "Pantalón vaquero de corte clásico y resistente.",
    price: 49.99,
    stock: 25,
    imageUrl: "/src/assets/vaqueros-acampanados.jpg"
  },
  {
    id: "4",
    name: "Zapatillas Urbanas",
    description: "Zapatillas cómodas para combinar con cualquier look.",
    price: 59.99,
    stock: 20,
    imageUrl: "/src/assets/zapatillas.webp"
  },
  {
    id: "5",
    name: "Mochila Urbana",
    description: "Mochila ligera con varios compartimentos para uso diario.",
    price: 34.99,
    stock: 15,
    imageUrl: "/src/assets/mochila.webp"
  },
  {
    id: "6",
    name: "Gorra Deportiva",
    description: "Gorra ajustable y ligera para actividades al aire libre.",
    price: 14.99,
    stock: 40,
    imageUrl: "/src/assets/gorra.webp"
  },
  {
    id: "7",
    name: "Chaqueta Ligera",
    description: "Chaqueta ligera y versátil para entretiempo.",
    price: 69.99,
    stock: 18,
    imageUrl: "/src/assets/chaqueta_ligera.jpg"
  },
  {
    id: "8",
    name: "Sudadera con Capucha",
    description: "Sudadera con capucha, suave y confortable.",
    price: 44.99,
    stock: 22,
    imageUrl: "/src/assets/sudadera.jpg"
  },
  {
    id: "9",
    name: "Bolso Casual",
    description: "Bolso práctico y elegante para el uso diario.",
    price: 29.99,
    stock: 12,
    imageUrl: "/src/assets/bolso.jpg"
  },
  {
    id: "10",
    name: "Reloj Deportivo",
    description: "Reloj deportivo con diseño moderno y resistente.",
    price: 79.99,
    stock: 10,
    imageUrl: "/src/assets/reloj.webp"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ 10 productos insertados correctamente");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
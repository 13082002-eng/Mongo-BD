const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los productos",
    });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el producto",
    });
  }
});

// POST /products
router.post("/", async (req, res) => {
  try {
    const { id, name, description, price, stock, imageUrl } = req.body;

    if (!id || !name || !description || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Faltan datos obligatorios",
      });
    }

    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
      return res.status(400).json({
        message: "Ya existe un producto con ese ID",
      });
    }

    const product = await Product.create({
      id,
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
});

module.exports = router;

// PUT /products/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        description,
        price,
        stock,
        imageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
});
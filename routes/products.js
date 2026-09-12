const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Función para subir una imagen a Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce-products",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

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
router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { id, name, description, price, stock } = req.body;

    if (
      !id ||
      !name ||
      !description ||
      price === undefined ||
      stock === undefined ||
      !req.file
    ) {
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

    // Subir imagen a Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    const product = await Product.create({
      id,
      name,
      description,
      price,
      stock,
      imageUrl: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
});

// PUT /products/:id
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const updateData = {
      name,
      description,
      price,
      stock,
    };

    // Si se selecciona una nueva imagen, subirla a Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.imageUrl = result.secure_url;
    }

    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      updateData,
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

// DELETE /products/:id
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      id: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
});

module.exports = router;
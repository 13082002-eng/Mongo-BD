const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

const router = express.Router();

// Obtener carrito
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el carrito",
    });
  }
});

// Añadir producto al carrito
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Producto y cantidad son obligatorios",
      });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
      });
    }

    await cart.save();

    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al añadir al carrito",
    });
  }
});

// Eliminar producto del carrito
router.delete("/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== req.params.productId
    );

    await cart.save();

    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar del carrito",
    });
  }
});

// Checkout
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "Compra realizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al realizar la compra",
    });
  }
});

module.exports = router;
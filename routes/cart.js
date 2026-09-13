const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");
const stripe = require("../config/stripe");
const Product = require("../models/Product");

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5175";

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

// Eliminar producto completo del carrito
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

// Restar una unidad de un producto del carrito
router.patch("/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    const item = cart.items.find(
      (item) => item.productId === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Producto no encontrado en el carrito",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.productId !== req.params.productId
      );
    }

    await cart.save();

    res.json(cart.items);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al modificar el carrito",
    });
  }
});

// Vaciar carrito después de una compra
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "Carrito vaciado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al vaciar el carrito",
    });
  }
});

// Checkout con Stripe
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "El carrito está vacío",
      });
    }

    const lineItems = [];

    for (const item of cart.items) {
      const product = await Product.findOne({
        id: item.productId,
      });

      if (!product) {
        return res.status(404).json({
          message: `Producto no encontrado: ${item.productId}`,
        });
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${FRONTEND_URL}/checkout`,
      cancel_url: `${FRONTEND_URL}/cart`,
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear la sesión de Stripe",
    });
  }
});

module.exports = router;
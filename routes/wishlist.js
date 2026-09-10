const express = require("express");
const Wishlist = require("../models/Wishlist");
const auth = require("../middleware/auth");

const router = express.Router();

// Obtener wishlist
router.get("/", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      userId: req.user.id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user.id,
        productIds: [],
      });
    }

    res.json(wishlist.productIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la wishlist",
    });
  }
});

// Añadir o quitar producto
router.post("/toggle", auth, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "El producto es obligatorio",
      });
    }

    let wishlist = await Wishlist.findOne({
      userId: req.user.id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user.id,
        productIds: [],
      });
    }

    const productIndex = wishlist.productIds.indexOf(productId);

    if (productIndex === -1) {
      wishlist.productIds.push(productId);
    } else {
      wishlist.productIds.splice(productIndex, 1);
    }

    await wishlist.save();

    res.json(wishlist.productIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la wishlist",
    });
  }
});

module.exports = router;
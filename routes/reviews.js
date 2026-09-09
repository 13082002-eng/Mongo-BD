const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// GET /products/:productId/reviews
router.get("/:productId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las reseñas",
    });
  }
});

// POST /products/:productId/reviews
router.post("/:productId/reviews", async (req, res) => {
  try {
    const review = await Review.create({
      productId: req.params.productId,
      username: req.body.username,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la reseña",
    });
  }
});

module.exports = router;
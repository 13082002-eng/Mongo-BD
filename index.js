require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

const { dbConnection } = require('./config/config');

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/test', (req, res) => {
  res.send('Servidor funcionando');
});

app.use('/products', productsRoutes);
app.use('/products', reviewsRoutes);
app.use('/users', usersRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
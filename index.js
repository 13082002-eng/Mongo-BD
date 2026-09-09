const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;

const { dbConnection } = require('./config/config');

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const reviewsRoutes = require('./routes/reviews');

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/test', (req, res) => {
  res.send('Servidor funcionando');
});

app.use('/products', productsRoutes);
app.use('/products', reviewsRoutes);
app.use('/users', usersRoutes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
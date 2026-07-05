// routes/index.js

const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');

router.use('/', usersRoutes);

module.exports = router;
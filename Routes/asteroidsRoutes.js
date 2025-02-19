const express = require('express');
const router = express.Router();
const { getAsteroidsByDate, getAsteroidById, getSavedAsteroids } = require('../Controllers/asteroidsController');

// Rota para buscar asteroides por data
router.get('/feed', getAsteroidsByDate);

// Rota para buscar um asteroide por ID
router.get('/:id', getAsteroidById);

// Rota para listar asteroides salvos
router.get('/', getSavedAsteroids);

module.exports = router;

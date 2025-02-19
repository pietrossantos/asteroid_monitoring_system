const Asteroid = require('../Models/asteroid');
const { fetchAsteroidsByDate, fetchAsteroidById } = require('../Services/nasaService');
// Função para processar os dados do asteroide
const processAsteroidData = (asteroidData) => ({
  neo_reference_id: asteroidData.neo_reference_id,
  name: asteroidData.name,
  nasa_jpl_url: asteroidData.nasa_jpl_url,
  absolute_magnitude_h: asteroidData.absolute_magnitude_h,
  estimated_diameter: asteroidData.estimated_diameter,
  is_potentially_hazardous_asteroid: asteroidData.is_potentially_hazardous_asteroid,
  close_approach_data: asteroidData.close_approach_data,
  orbital_data: asteroidData.orbital_data,
  is_sentry_object: asteroidData.is_sentry_object
});

// Função para buscar e salvar asteroides por data
const getAsteroidsByDate = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'Parâmetros start_date e end_date são obrigatórios' });
    }

    const asteroidsData = await fetchAsteroidsByDate(start_date, end_date);
    const allAsteroids = Object.values(asteroidsData).flat();

    // Salvar asteroides no banco de dados
    const savedAsteroids = await Promise.all(
      allAsteroids.map(async (asteroid) => {
        const [savedAsteroid] = await Asteroid.findOrCreate({
          where: { neo_reference_id: asteroid.neo_reference_id },
          defaults: processAsteroidData(asteroid)
        });
        return savedAsteroid;
      })
    );

    res.json({
      count: savedAsteroids.length,
      asteroids: savedAsteroids
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar asteroides', details: error.message });
  }
};

// Função para buscar um asteroide por ID
const getAsteroidById = async (req, res) => {
  try {
    const { id } = req.params;
    const asteroidData = await fetchAsteroidById(id);

    const [savedAsteroid] = await Asteroid.findOrCreate({
      where: { neo_reference_id: asteroidData.neo_reference_id },
      defaults: processAsteroidData(asteroidData)
    });

    res.json(savedAsteroid);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar asteroide', details: error.message });
  }
};

// Função para listar asteroides salvos
const getSavedAsteroids = async (req, res) => {
  try {
    const { hazardous } = req.query;
    const whereClause = hazardous === 'true' ? { is_potentially_hazardous_asteroid: true } : {};

    const asteroids = await Asteroid.findAll({ where: whereClause });
    res.json({ count: asteroids.length, asteroids });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar asteroides salvos', details: error.message });
  }
};

module.exports = { getAsteroidsByDate, getAsteroidById, getSavedAsteroids };

const axios = require('axios');
require('dotenv').config();

const NASA_API_BASE = 'https://api.nasa.gov/neo/rest/v1';

// Função para buscar asteroides por data
const fetchAsteroidsByDate = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${NASA_API_BASE}/feed`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: process.env.NASA_API_KEY
      }
    });
    return response.data.near_earth_objects;
  } catch (error) {
    console.error('Erro na API NASA:', error.response?.data || error.message);
    throw error;
  }
};

// Função para buscar um asteroide por ID
const fetchAsteroidById = async (asteroidId) => {
  try {
    const response = await axios.get(`${NASA_API_BASE}/neo/${asteroidId}`, {
      params: {
        api_key: process.env.NASA_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro na API NASA:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { fetchAsteroidsByDate, fetchAsteroidById };

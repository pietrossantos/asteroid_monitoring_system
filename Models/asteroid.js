const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/database');

const Asteroid = sequelize.define('asteroid', {
  neo_reference_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Garantir que cada asteroide seja único
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nasa_jpl_url: DataTypes.STRING,
  absolute_magnitude_h: DataTypes.FLOAT,
  estimated_diameter: {
    type: DataTypes.TEXT, // Armazenar JSON como texto
    get() {
      const rawValue = this.getDataValue('estimated_diameter');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('estimated_diameter', JSON.stringify(value));
    }
  },
  is_potentially_hazardous_asteroid: DataTypes.BOOLEAN,
  close_approach_data: {
    type: DataTypes.TEXT, // Armazenar JSON como texto
    get() {
      const rawValue = this.getDataValue('close_approach_data');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('close_approach_data', JSON.stringify(value));
    }
  },
  orbital_data: {
    type: DataTypes.TEXT, // Armazenar JSON como texto
    get() {
      const rawValue = this.getDataValue('orbital_data');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('orbital_data', JSON.stringify(value));
    }
  },
  is_sentry_object: DataTypes.BOOLEAN
}, {
  timestamps: true // Adicionar campos createdAt e updatedAt
});

module.exports = Asteroid;
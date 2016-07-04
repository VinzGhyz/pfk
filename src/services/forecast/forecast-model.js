'use strict';

// forecast-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const forecast = sequelize.define('forecasts', {
    time: {
      type: Sequelize.DATE
    },
    clouds: {
      type: Sequelize.INTEGER
    },
    temperature: {
      type: Sequelize.FLOAT
    },
    wind_speed: {
      type: Sequelize.INTEGER
    },
    wind_direction: {
      type: Sequelize.INTEGER
    },
    wind_gusts: {
      type: Sequelize.INTEGER
    },
    waves_height: {
      type: Sequelize.FLOAT
    },
    waves_period: {
      type: Sequelize.INTEGER
    },
    waves_direction: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate(models) {
        forecast.belongsTo(models.spots);
      }
    }
  });

  return forecast;
};

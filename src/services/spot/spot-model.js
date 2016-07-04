'use strict';

// spot-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const spot = sequelize.define('spots', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    windfinder_id: {
      type: Sequelize.STRING(5),
      allowNull: false
    },
    direction_min: {
      type: Sequelize.INTEGER
    },
    direction_max: {
      type: Sequelize.INTEGER
    },
    lat: {
      type: Sequelize.FLOAT
    },
    lon: {
      type: Sequelize.FLOAT
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate(models) {
        spot.hasMany(models.forecasts);
      }
    }
  });

  return spot;
};

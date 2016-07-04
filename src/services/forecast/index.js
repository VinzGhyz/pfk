'use strict';

const service = require('feathers-sequelize');
const forecast = require('./forecast-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: forecast(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/forecasts', service(options));

  // Get our initialize service to that we can bind hooks
  const forecastService = app.service('/forecasts');

  // Set up our before hooks
  forecastService.before(hooks.before);

  // Set up our after hooks
  forecastService.after(hooks.after);
};

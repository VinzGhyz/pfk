'use strict';

const service = require('feathers-sequelize');
const spot = require('./spot-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: spot(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/spots', service(options));

  // Get our initialize service to that we can bind hooks
  const spotService = app.service('/spots');

  // Set up our before hooks
  spotService.before(hooks.before);

  // Set up our after hooks
  spotService.after(hooks.after);
};

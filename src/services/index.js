'use strict';

const forecast = require('./forecast');
const spot = require('./spot');
const authentication = require('./authentication');
const user = require('./user');

const Sequelize = require('sequelize');

module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false //console.log
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(spot);
  app.configure(forecast);

  const models = sequelize.models;
  Object.keys(models)
    .map(name => models[name])
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};

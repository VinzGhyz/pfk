'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    console.log('Forest route triggered');
    res.status(204).send();
  };
};

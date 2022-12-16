// Initializes the `calle` service on path `/calle`
const { Calle } = require('./calle.class');
const createModel = require('../../models/calle.model');
const hooks = require('./calle.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/calle', new Calle(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calle');

  service.hooks(hooks);
};

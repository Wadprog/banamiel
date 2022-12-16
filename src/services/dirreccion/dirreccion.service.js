// Initializes the `dirreccion` service on path `/dirreccion`
const { Dirreccion } = require('./dirreccion.class');
const createModel = require('../../models/dirreccion.model');
const hooks = require('./dirreccion.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/dirreccion', new Dirreccion(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('dirreccion');

  service.hooks(hooks);
};

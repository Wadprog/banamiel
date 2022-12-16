// Initializes the `departamento` service on path `/departamento`
const { Departamento } = require('./departamento.class');
const createModel = require('../../models/departamento.model');
const hooks = require('./departamento.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/departamento', new Departamento(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('departamento');

  service.hooks(hooks);
};

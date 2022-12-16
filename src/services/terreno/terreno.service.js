// Initializes the `terreno` service on path `/terreno`
const { Terreno } = require('./terreno.class');
const createModel = require('../../models/terreno.model');
const hooks = require('./terreno.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/terreno', new Terreno(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('terreno');

  service.hooks(hooks);
};

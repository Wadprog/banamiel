// Initializes the `productos ` service on path `/productos`
const { Productos } = require('./productos.class');
const createModel = require('../../models/productos.model');
const hooks = require('./productos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/productos', new Productos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('productos');

  service.hooks(hooks);
};

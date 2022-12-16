// Initializes the `entidad ` service on path `/entidad`
const { Entidad } = require("./entidad.class");
const createModel = require("../../models/entidad.model");
const hooks = require("./entidad.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("api/entidad", new Entidad(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/entidad");

  service.hooks(hooks);
};

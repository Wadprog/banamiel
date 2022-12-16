// Initializes the `planificacion` service on path `/planificacion`
const { Planificacion } = require("./planificacion.class");
const createModel = require("../../models/planificacion.model");
const hooks = require("./planificacion.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("api/planificacion", new Planificacion(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/planificacion");

  service.hooks(hooks);
};

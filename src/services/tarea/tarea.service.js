// Initializes the `tarea` service on path `/tarea`
const { Tarea } = require("./tarea.class");
const createModel = require("../../models/tarea.model");
const hooks = require("./tarea.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("api/tarea", new Tarea(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/tarea");

  service.hooks(hooks);
};

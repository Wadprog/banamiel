// Initializes the `surcusal ` service on path `/surcusal`
const { Surcusal } = require("./surcusal.class");
const createModel = require("../../models/surcusal.model");
const hooks = require("./surcusal.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("api/surcusal", new Surcusal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/surcusal");

  service.hooks(hooks);
};

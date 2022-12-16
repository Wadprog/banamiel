// Initializes the `employees` service on path `/employees`
const { Employees } = require("./employees.class");
const createModel = require("../../models/employees.model");
const hooks = require("./employees.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("api/employees", new Employees(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/employees");

  service.hooks(hooks);
};

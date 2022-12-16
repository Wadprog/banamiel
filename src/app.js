const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");
const engine = require("ejs-mate");
const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const multer = require("multer");
const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");
const authentication = require("./authentication");
const sequelize = require("./sequelize");


const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));
app.engine("ejs", engine);
app.set("view engine", "ejs");
// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

app.get("/dashboard", (req, res) => {
  res.render("pages/index", {
    user: { name: "test" },
    ordersList: [
      { id: 23, nombre_producto: "test", cantidad: 2, status: "test" },
    ],
  });
});

app.use("/employees", require("./routes/employees.route")(app));
app.use("/surcusal", require("./routes/surcusal.route")(app));
app.use("/projects", require("./routes/project.route")(app));
app.use("/todos", require("./routes/tarea.route")(app));

app.get("/messages", function (req, res, next) {
  app
    .service("users")
    .find({ query: { $sort: { updatedAt: -1 } } })
    .then((result) => res.render("pages/index"))
    .catch(next);
});
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
